import { FeaturedAnnouncementIndexFragment } from "../src/generated/queries";
import { Card, CardContent, CardProps } from "@mui/material";
import CardHeaderWithChip, { DateChip } from "./CardHeaderWithChip";
import MarkdownRenderer from "./MarkdownRenderer";
import theme from "../src/theme";

interface AnnouncementCardProps {
    announcement: FeaturedAnnouncementIndexFragment,
    className?: string
}

export function AnnouncementCard({ announcement, ...cardProps }: AnnouncementCardProps & CardProps) {
    return (
        <Card sx={{
            "& p": {
                marginBottom: "0"
            },
            "& a": {
                color: theme.palette.primary.light + " !important"
            }    
        }} variant="outlined" {...cardProps}>
            <CardContent sx={{
                paddingBottom: "1rem !important"
            }}>
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