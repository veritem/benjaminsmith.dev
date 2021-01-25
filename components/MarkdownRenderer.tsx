import { makeStyles, Typography } from "@material-ui/core";
import ReactMarkdown from "react-markdown";
import { Variant } from "@material-ui/core/styles/createTypography";

const useStyles = makeStyles((theme) => ({
    markdownContainer: {
        "& a": {
            color: theme.palette.primary.main,
            "&:hover": {
                textDecoration: "underline"
            }
        },
        "& pre": {
            backgroundColor: theme.palette.background.default,
            display: "inline-block",
            padding: "0.5rem",
            borderRadius: "0.5rem"
        },
        "& code": {
            backgroundColor: theme.palette.background.paper,
            padding: "0 0.25rem",
            borderRadius: "0.25rem"
        }
    }
}))

interface MarkdownRendererProps {
    text: string,
    variant?: Variant
}

export default function MarkdownRenderer({ text, variant }: MarkdownRendererProps) {
    const styles = useStyles();

    return (
        <Typography className={styles.markdownContainer} variant={variant ?? "body1"} component="div">
            <ReactMarkdown>{text}</ReactMarkdown>
        </Typography>
    );
}