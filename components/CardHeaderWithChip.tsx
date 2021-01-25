import { makeStyles, Typography, Chip } from "@material-ui/core";
import { CalendarToday } from "@material-ui/icons";
import { Variant } from "@material-ui/core/styles/createTypography";

interface CardHeaderWithChipProps {
    title: string | React.ReactNode,
    subheader?: string | React.ReactNode,
    chip?: React.ReactNode,
    headerVariant?: Variant
}

const CARD_HEADER_BREAKPOINT = 650;

const useStyles = makeStyles((theme) => ({
    cardHeader: {
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
    },
    subheader: {
        color: theme.palette.text.secondary
    },
    chip: {
        marginLeft: "auto",
        [theme.breakpoints.down(CARD_HEADER_BREAKPOINT)]: {
            marginTop: "0.5rem"
        }
    }
}));

export default function CardHeaderWithChip(props: CardHeaderWithChipProps) {
    const styles = useStyles();

    return (
        <div className={styles.cardHeader}>
            <div>
                <Typography variant={props.headerVariant ?? "h5"}>{props.title}</Typography>
                {props.subheader && (
                    <Typography className={styles.subheader} variant="body1">{props.subheader}</Typography>
                )}
            </div>
            {props.chip && (
                <div className={styles.chip}>
                    {props.chip}
                </div>
            )}
        </div>
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