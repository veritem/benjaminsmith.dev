import { Card, CardContent, CardHeader, Chip, Collapse, Link, makeStyles, Typography } from "@material-ui/core";
import { CalendarToday } from "@material-ui/icons";
import { PositionIndexFragment } from "../src/generated/queries";

interface PositionCardProps {
    position: PositionIndexFragment,
    showPoints?: boolean,
    className?: string
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
    dateChip: {
        marginLeft: "auto"
    }
}));

const startAndEndDateFormat = (
    startDate: string | undefined,
    endDate: string | undefined
) =>
    startDate === undefined
        ? undefined
        : startDate === endDate
        ? startDate
        : startDate + " - " + (endDate ?? "present");

export default function PositionCard({ position, showPoints, className }: PositionCardProps) {
    const styles = useStyles();
    const points = position.points && (
        <ul>
            {position.points.map(point => (
                <li key={point}>{point}</li>
            ))}
        </ul>
    );

    return (
        <CardContent className={className}>
            <div className={styles.cardHeader}>
                <div>
                    <Typography variant="h5">{
                        position.companyUrl !== undefined && position.companyUrl !== null
                        ? <Link href={position.companyUrl}>{position.company}</Link>
                        : position.company
                    }</Typography>
                    <Typography className={styles.subheader} variant="body1">{position.position}</Typography>
                </div>
                <Chip variant="outlined" className={styles.dateChip} icon={<CalendarToday fontSize="small"/>} label={startAndEndDateFormat(position.startDate, position.endDate ?? undefined)}/>
            </div>
            <Typography variant="body1">{position.description}</Typography>
            {(showPoints !== undefined) ? (
                <Collapse in={showPoints}>
                    {points}
                </Collapse>
            ) : points}
        </CardContent>
    )
}