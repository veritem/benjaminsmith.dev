import { FeaturedAnnouncementIndexFragment } from "../src/generated/queries";
import { makeStyles, Card, CardContent } from "@material-ui/core";
import CardHeaderWithChip, { DateChip } from "./CardHeaderWithChip";
import MarkdownRenderer from "./MarkdownRenderer";
import { formatAdditionalClassName } from "../src/utils";

const useStyles = makeStyles((theme) => ({
    card: {
        "& p": {
            marginBottom: "0"
        },
        "& a": {
            color: theme.palette.primary.light + " !important"
        }
    },
    cardContent: {
        paddingBottom: "1rem !important"
    }
}));

interface AnnouncementCardProps {
    announcement: FeaturedAnnouncementIndexFragment,
    className?: string
}

export function AnnouncementCard({ announcement, className }: AnnouncementCardProps) {
    const styles = useStyles();
    return (
        <Card className={styles.card + formatAdditionalClassName(className)} variant="outlined">
            <CardContent className={styles.cardContent}>
                <CardHeaderWithChip
                    title={announcement.title ?? "Announcement"}
                    chip={DateChip({date: announcement.date})}
                    headerVariant="h6"
                />
                {announcement.information && (
                    <MarkdownRenderer variant="body2" text={announcement.information}/>
                )}
            </CardContent>
        </Card>
    );
}