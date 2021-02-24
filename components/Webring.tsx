import { makeStyles } from "@material-ui/core"

const useStyles = makeStyles({
    wrapper: {
        width: "100%",
        display: "flex",
        justifyContent: "center",
        marginTop: "1rem"
    },
    webringAnchor: {
        fontSize: "24px",
        color: "rgba(132,146,166,.8)",
        textDecoration: "none",
        transition: "color .5s",
        "&:hover": {
            color: "#8492a6",
            textDecoration: "none"
        }
    },
    webringLogo: {
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
    }
});

export interface WebringMember {
    member: string,
    url: string
}

export interface WebringProps {
    prevUrl: string,
    nextUrl: string
}

export default function Webring({ prevUrl, nextUrl }: WebringProps) {
    const styles = useStyles();

    return (
        <div className={styles.wrapper}>
            <a
                href={prevUrl}
                className={styles.webringAnchor}
                title="Previous"
            >
                ‹
            </a>
            <a
                href="https://webring.hackclub.com/"
                className={styles.webringLogo}
                title="Hack Club Webring"
            ></a>
            <a
                href={nextUrl}
                className={styles.webringAnchor}
                title="Next"
            >
                ›
            </a>
        </div>
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