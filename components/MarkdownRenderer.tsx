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