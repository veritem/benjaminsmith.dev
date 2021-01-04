import { FeaturedAnnouncementIndexFragment } from "../src/generated/queries";
import { makeStyles, Card, CardContent } from "@material-ui/core";
import CardHeaderWithChip, { DateChip } from "./CardHeaderWithChip";
import MarkdownRenderer from "./MarkdownRenderer";

/*const useStyles = makeStyles((theme) => ({
    card: {
        
    }
}));*/

interface AnnouncementCardProps {
    announcement: FeaturedAnnouncementIndexFragment,
    className?: string
}

export function AnnouncementCard({ announcement, className }: AnnouncementCardProps) {
    return (
        <Card variant="outlined">
            <CardContent>
                <CardHeaderWithChip
                    title={announcement.title ?? "Announcement"}
                    chip={DateChip({date: announcement.date})}
                />
                {announcement.information && (
                    <MarkdownRenderer text={announcement.information}/>
                )}
            </CardContent>
        </Card>
    );
}