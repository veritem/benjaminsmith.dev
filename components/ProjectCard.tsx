import { Card, CardHeader, makeStyles } from "@material-ui/core";
import { FeaturedProjectIndexFragment } from "../src/generated/queries";

const useStyles = makeStyles((theme) => ({
    cardMedia: {
        backgroundColor: "#202020",
        "& img": {
            maxWidth: "100%",
            maxHeight: "18rem",
            marginLeft: "auto",
            marginRight: "auto",
            padding: "1rem"
        }
    }
}));

interface ProjectCardProps {
    project: FeaturedProjectIndexFragment,
    className: string | undefined
}

export default function ProjectCard({ project, className }: ProjectCardProps) {
    const styles = useStyles();
    return (
        <Card variant="outlined" className={className}>
            <CardHeader title={project.title} subheader={project.tagline}/>
            {project.mediaCollection?.items[0] && (
                <div className={styles.cardMedia}>
                    <img src={project.mediaCollection.items[0].url ?? undefined} title={project.mediaCollection.items[0].title ?? undefined}/>
                </div>
            )}
        </Card>
    )
}