import { Typography, Chip, TypographyProps, Box } from "@mui/material";
import { CalendarToday } from "@mui/icons-material";
import theme from "../src/theme";

interface CardHeaderWithChipProps {
    title: string | React.ReactNode,
    subheader?: string | React.ReactNode,
    chip?: React.ReactNode,
    headerVariant?: TypographyProps["variant"]
}

const CARD_HEADER_BREAKPOINT = 650;

export default function CardHeaderWithChip(props: CardHeaderWithChipProps) {
    return (
        <Box sx={{
            "& .MuiTypography-root": {
                display: "inline-block"
            },
            "& a": {
                color: "white"
            },
            "& > div > h5": {
                marginRight: "1rem"
            },
            marginBottom: "1rem",
            display: "flex",
            [theme.breakpoints.down(CARD_HEADER_BREAKPOINT)]: {
                display: "block"
            },
            alignItems: "center"    
        }}>
            <div>
                <Typography variant={props.headerVariant ?? "h5"}>{props.title}</Typography>
                {props.subheader && (
                    <Typography sx={{
                        color: theme.palette.text.secondary
                    }} variant="body1">{props.subheader}</Typography>
                )}
            </div>
            {props.chip && (
                <Box sx={{
                    marginLeft: "auto",
                    [theme.breakpoints.down(CARD_HEADER_BREAKPOINT)]: {
                        marginTop: "0.5rem"
                    }            
                }}>
                    {props.chip}
                </Box>
            )}
        </Box>
    );
}

export const DateChip = ({ date }: { date: string | undefined | null }) => (
    date !== undefined &&
    date !== null ? (
        <Chip
            variant="outlined"
            icon={<CalendarToday fontSize="small"/>}
            label={date}
        />
    ) : undefined
);