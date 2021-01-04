import { makeStyles, Typography } from "@material-ui/core";
import ReactMarkdown from "react-markdown";

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
    text: string
}

export default function MarkdownRenderer({ text }: MarkdownRendererProps) {
    const styles = useStyles();

    return (
        <Typography className={styles.markdownContainer} variant="body1" component="div">
            <ReactMarkdown>{text}</ReactMarkdown>
        </Typography>
    );
}