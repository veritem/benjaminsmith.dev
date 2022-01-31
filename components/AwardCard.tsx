import { Card, CardContent, CardHeader, CardProps, Chip, Link, Typography } from "@mui/material";
import { AwardIndexFragment } from "../src/generated/queries";
import theme from "../src/theme";
import CardHeaderWithChip, { DateChip } from "./CardHeaderWithChip";
import NextMuiLink from "./NextMuiLink";

interface AwardCardProps {
    award: AwardIndexFragment,
}

export default function AwardCard({ award, ...cardProps }: AwardCardProps & CardProps) {
    return (
        <Card variant="outlined" {...cardProps}>
            <CardContent>
                <CardHeaderWithChip
                    title={award.award}
                    subheader={
                        award.organizationUrl !== undefined &&
                        award.organizationUrl !== null ? (
                            <Link href={award.organizationUrl}>{award.organization}</Link>
                        ) : (
                            award.organization
                        )
                    }
                    chip={DateChip({date: award.date})}
                />
                <Typography variant="body1">{award.description}</Typography>
                {award.submissionUrl && (
                    <Link sx={{
                        color: theme.palette.primary.light
                    }} href={award.submissionUrl}>Submission URL</Link>
                )}
                {award.submissionUrl && award.submissionProject && (
                    <Typography sx={{
                        display: "inline-block"
                    }}>&nbsp;|&nbsp;</Typography>
                )}
                {award.submissionProject && (
                    <NextMuiLink sx={{
                        color: theme.palette.primary.light
                    }} href={"/project/" + encodeURIComponent(award.submissionProject.title)}>View project page</NextMuiLink>
                )}
            </CardContent>
        </Card>
    )
}