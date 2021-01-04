import { Card, CardContent, CardHeader, Chip, Link, makeStyles, Typography } from "@material-ui/core";
import { CalendarToday } from "@material-ui/icons";
import { AwardIndexFragment } from "../src/generated/queries";
import CardHeaderWithChip, { DateChip } from "./CardHeaderWithChip";
import NextMuiLink from "./NextMuiLink";

const useStyles = makeStyles((theme) => ({
    cardLink: {
        color: theme.palette.primary.light
    },
    linkSeparator: {
        display: "inline-block"
    }
}));

interface AwardCardProps {
    award: AwardIndexFragment,
    className?: string
}

export default function AwardCard({ award, className }: AwardCardProps) {
    const styles = useStyles();

    return (
        <Card variant="outlined" className={className}>
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
                    <Link className={styles.cardLink} href={award.submissionUrl}>Submission URL</Link>
                )}
                {award.submissionUrl && award.submissionProject && (
                    <Typography className={styles.linkSeparator}>&nbsp;|&nbsp;</Typography>
                )}
                {award.submissionProject && (
                    <NextMuiLink muiLinkClassName={styles.cardLink} href={"/project/" + encodeURIComponent(award.submissionProject.title)}>View project page</NextMuiLink>
                )}
            </CardContent>
        </Card>
    )
}