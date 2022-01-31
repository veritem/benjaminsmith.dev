import { Typography, Link, Box, SxProps } from "@mui/material";

const webringAnchorStyles: SxProps = {
    fontSize: "24px",
    color: "rgba(132,146,166,.8)",
    textDecoration: "none",
    transition: "color .5s",
    "&:hover": {
        color: "#8492a6",
        textDecoration: "none"
    }
};

export interface WebringMember {
    member: string,
    url: string
}

export interface FooterProps {
    prevUrl: string,
    nextUrl: string
}

export default function Footer({ prevUrl, nextUrl }: FooterProps) {
    return (
        <Box sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            "& > *": {
                marginTop: "1rem"
            },
            alignItems: "center"    
        }}>
            <Typography sx={{ fontSize: "0.8rem" }} color="textSecondary">Build ID: {
                process.env.NEXT_PUBLIC_BUILD_ID ? (
                    <Link href={process.env.NEXT_PUBLIC_GITHUB_URL + "/commit/" + process.env.NEXT_PUBLIC_BUILD_ID}>
                        {process.env.NEXT_PUBLIC_BUILD_ID}
                    </Link>
                ) : "(is dev build)"
            }
            </Typography>
            <Box sx={{
                display: "flex",
                justifyContent: "center"
            }}>
                <Box
                    component="a"
                    href={prevUrl}
                    title="Previous"
                    sx={webringAnchorStyles}
                >
                    ‹
                </Box>
                <Box
                    component="a"
                    href="https://webring.hackclub.com/"
                    title="Hack Club Webring"
                    sx={{
                        backgroundImage: "url(https://assets.hackclub.com/icon-rounded.svg)",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "top left",
                        backgroundSize: "contain",
                        flexShrink: 0,
                        display: "inline-block",
                        width: "36px",
                        height: "36px",
                        margin: "0 4px",
                        verticalAlign: "middle",
                        filter: "grayscale(100%)",
                        transition: "filter .5s",
                        "&:hover": {
                            filter: "initial"
                        }                
                    }}
                ></Box>
                <Box
                    component="a"
                    href={nextUrl}
                    title="Next"
                    sx={webringAnchorStyles}
                >
                    ›
                </Box>
            </Box>
        </Box>
    );
}

export function wrDataToUrls(data: WebringMember[]) {
    // Code adapted from original Hack Club webring code
    let currentIndex = 0;

    for(let i = 0; i < data.length; i++) {
        if(process.env.NEXT_PRIVATE_DOMAIN === data[i].url.toLowerCase()) {
            currentIndex = i;
            break;
        }
    }

    let prevIndex = currentIndex - 1;
    -1 === prevIndex && (prevIndex = data.length - 1);
    let nextIndex = currentIndex + 1;
    nextIndex === data.length && (nextIndex = 0);

    return [
        data[prevIndex].url,
        data[nextIndex].url
    ]
}