import { Card, CardContent, CardHeader, Chip, Collapse, Link, makeStyles, Typography } from "@material-ui/core";
import { CalendarToday } from "@material-ui/icons";
import { PositionIndexFragment } from "../src/generated/queries";
import CardHeaderWithChip from "./CardHeaderWithChip";

interface PositionCardProps {
    position: PositionIndexFragment,
    showPoints?: boolean,
    className?: string
}

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
    const points = position.points && (
        <ul>
            {position.points.map(point => (
                <li key={point}>{point}</li>
            ))}
        </ul>
    );

    return (
      <CardContent className={className}>
        <CardHeaderWithChip
            title={
                position.companyUrl !== undefined &&
                position.companyUrl !== null ? (
                    <Link href={position.companyUrl}>{position.company}</Link>
                ) : (
                    position.company
                )
            }
            subheader={position.position}
            chip={
                <Chip
                    variant="outlined"
                    icon={<CalendarToday fontSize="small"/>}
                    label={startAndEndDateFormat(
                        position.startDate,
                        position.endDate ?? undefined
                    )}
                />
            }
        />
        <Typography variant="body1">{position.description}</Typography>
        {showPoints !== undefined ? (
          <Collapse in={showPoints}>{points}</Collapse>
        ) : (
          points
        )}
      </CardContent>
    );
}