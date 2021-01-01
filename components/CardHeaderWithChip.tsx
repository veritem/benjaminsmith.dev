import { makeStyles, Typography } from "@material-ui/core";

interface CardHeaderWithChipProps {
    title: string | React.ReactNode,
    subheader: string | React.ReactNode,
    chip: React.ReactNode
}

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
        alignItems: "center"
    },
    subheader: {
        color: theme.palette.text.secondary
    },
    chip: {
        marginLeft: "auto"
    }
}));

export default function CardHeaderWithChip(props: CardHeaderWithChipProps) {
    const styles = useStyles();

    return (
        <div className={styles.cardHeader}>
            <div>
                <Typography variant="h5">{props.title}</Typography>
                <Typography className={styles.subheader} variant="body1">{props.subheader}</Typography>
            </div>
            <div className={styles.chip}>
                {props.chip}
            </div>
        </div>
    );
}