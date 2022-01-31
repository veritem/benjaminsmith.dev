import { Box, BoxProps, Button, Stack } from "@mui/material";
import { imageConfigDefault } from "next/dist/server/image-config";
import { useState } from "react"
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import { ProjectAssetFragment } from "../src/generated/queries";
import theme from "../src/theme";

export type MakeRequired<T> = {
    [K in keyof T]-?: Exclude<T[K], null | undefined>
};

interface ImageGalleryProps {
    srcs: MakeRequired<ProjectAssetFragment>[]
}

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

// For some reason the Next.js image server thing restricts the sizes you can resize to
// So find the one that's closest
const availableSizes = imageConfigDefault.deviceSizes.concat(imageConfigDefault.imageSizes).sort((a, b) => a - b);
function roundUpSize(size: number) {
    return availableSizes.find(s => s > size);
}

function constrainImageSize(width: number, height: number, maxWidth: number, maxHeight: number): { width: number, height: number } {
    if(width > maxWidth) {
        const ratio = maxWidth / width;
        width = maxWidth;
        height *= ratio;
    }
    if(height > maxHeight) {
        const ratio = maxHeight / height;
        height = maxHeight;
        width *= ratio;
    }
    return { width, height };
}

function BetterNextImage(props: {
    src: string,
    width: number,
    height: number,
    maxWidth: number,
    maxHeight: number,
    quality?: number,
    imgProps?: JSX.IntrinsicElements["img"]
} & BoxProps) {
    const { src, width, height, maxWidth, maxHeight, quality = 75, imgProps, sx, ...boxProps } = props;
    const { width: rWidth, height: rHeight } = constrainImageSize(width, height, maxWidth, maxHeight);
    const makeSrc = (w: number) => `/_next/image?url=${encodeURIComponent(src)}&w=${roundUpSize(w)}&q=${quality}`;

    return (
        <Box sx={{
            width: rWidth,
            height: rHeight,
            ...sx
        }} {...boxProps}>
            <img
                width={rWidth}
                height={rHeight}
                srcSet={`${makeSrc(rWidth)} 1x, ${makeSrc(rWidth * 2)} 2x`}
                src={makeSrc(rWidth * 2)}
                decoding="async"
                {...imgProps}
            />
        </Box>
    )
}

export default function ImageGallery({ srcs, ...boxProps }: ImageGalleryProps & BoxProps) {
    const [imgIndex, setImgIndex] = useState(0);

    return (
        <Box {...boxProps}>
            <AutoPlaySwipeableViews
                axis="x"
                index={imgIndex}
                onChangeIndex={step => setImgIndex(step)}
                enableMouseEvents
                style={{
                    flex: 1,
                    width: 800,
                    height: constrainImageSize(srcs[imgIndex].width, srcs[imgIndex].height, 800, 500).height,
                    transition: "height 0.25s ease-in-out",
                    overflowY: "hidden",
                    cursor: "grab"
                }}
                interval={10000}
            >
                {srcs.map(({ url, width, height }, index) => (
                    <Box key={url}>
                        {Math.abs(imgIndex - index) <= 2 ? (
                            <BetterNextImage width={width} height={height} maxWidth={800} maxHeight={500} src={url} sx={{
                                display: "block",
                                overflow: "hidden",
                                "& img": {
                                    userDrag: "none"
                                },
                            }} imgProps={{ draggable: false }} />
                        ) : null}
                    </Box>
                ))}
            </AutoPlaySwipeableViews>
            <Stack direction="row" spacing={"1rem"} sx={{
                "& .MuiButton-root": {
                    height: "fit-content"
                },
                alignItems: "center",
                marginTop: "1rem"
            }}>
                <Button
                    onClick={() => setImgIndex(imgIndex === 0  ? srcs.length - 1 : imgIndex - 1)}
                >
                    ← Back
                </Button>
                {srcs.map(({ url, width, height }, index) => (
                    <BetterNextImage
                        key={url}
                        src={url}
                        width={width}
                        height={height}
                        maxWidth={200}
                        maxHeight={150}
                        component="button"
                        onClick={() => setImgIndex(index)}
                        sx={{
                            border: `2px solid ${imgIndex === index ? theme.palette.primary.main : "white"}`,
                            height: "150px",
                            backgroundColor: "black",
                            display: "flex",
                            alignItems: "center",
                            cursor: "pointer",
                            transition: "border 0.2s cubic-bezier(.22,.61,.36,1)",
                            padding: 0,
                            boxSizing: "content-box"
                        }}
                    />
                ))}
                <Button
                    onClick={() => setImgIndex(imgIndex === srcs.length - 1 ? 0 : imgIndex + 1)}
                >
                    Next →
                </Button>
            </Stack>
        </Box>
    )
}