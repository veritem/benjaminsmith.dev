import { Link, makeStyles } from "@material-ui/core";
import { useState } from "react"

interface ImageGalleryProps {
    srcs: string[],
    className?: string
}

const useStyles = makeStyles((theme) => ({
    mainImage: {
        display: "block",
        maxWidth: "100%",
        maxHeight: "50vh"
    },
    mainImageContainer: {
        width: "100%",
        maxWidth: "1000px"
    },
    thumbnail: {
        cursor: "pointer"
    }
}));

export default function ImageGallery({ srcs, className }: ImageGalleryProps) {
    const styles = useStyles();
    const [imgIndex, setImgIndex] = useState(0);

    return (
        <div className={className}>
            <div className={styles.mainImageContainer}>
                <img className={styles.mainImage} src={srcs[imgIndex]} />
            </div>
            {srcs.length > 1 && srcs.map((img, index) => (
                <img key={img} className={styles.thumbnail} src={img + "&h=200"} onClick={() => setImgIndex(index)}/>
            ))}
        </div>
    )
}