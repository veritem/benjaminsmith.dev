import { Typography, TypographyProps } from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';
import ReactMarkdown from "react-markdown";
import theme from "../src/theme";

interface MarkdownRendererProps {
    text: string,
    variant?: TypographyProps["variant"]
}

export default function MarkdownRenderer({ text, variant }: MarkdownRendererProps) {
    return (
        <Typography sx={{
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
        }} variant={variant ?? "body1"} component="div">
            <ReactMarkdown>{text}</ReactMarkdown>
        </Typography>
    );
}