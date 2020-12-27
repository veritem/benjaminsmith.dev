import { Card, CardContent, CardHeader, CardMedia, makeStyles, Typography } from "@material-ui/core";
import { IProjectFields } from "../@types/generated/contentful";

const useStyles = makeStyles((theme) => ({
    cardMedia: {
        maxWidth: "100%",
        maxHeight: "18rem"
    }
}));

interface ProjectCardProps {
    project: IProjectFields,
    className: string | undefined
}

export default function ProjectCard({ project, className }: ProjectCardProps) {
    const styles = useStyles();
    return (
        <Card variant="outlined" className={className}>
            <CardHeader title={project.title} subheader={project.tagline}/>
            {project.media?.[0] !== undefined && (
                <img className={styles.cardMedia} src={project.media[0].fields.file.url} title={project.media[0].fields.title}/>
            )}
        </Card>
    )
}