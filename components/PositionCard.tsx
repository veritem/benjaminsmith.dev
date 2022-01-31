import { Card, CardContent, CardContentProps, CardHeader, Chip, Collapse, Link, Typography } from "@mui/material";
import { CalendarToday } from "@mui/icons-material";
import { PositionIndexFragment } from "../src/generated/queries";
import CardHeaderWithChip, { DateChip } from "./CardHeaderWithChip";

interface PositionCardProps {
    position: PositionIndexFragment,
    showPoints?: boolean
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

export default function PositionCard({ position, showPoints, ...cardContentProps }: PositionCardProps & CardContentProps) {
    const points = position.points && (
        <ul>
            {position.points.map(point => (
                <li key={point}>{point}</li>
            ))}
        </ul>
    );

    return (
      <CardContent {...cardContentProps}>
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
                DateChip({date: startAndEndDateFormat(
                        position.startDate,
                        position.endDate ?? undefined
                )})
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