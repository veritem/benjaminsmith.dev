import { Card, CardContent, CardHeader, CardMedia, makeStyles, Typography } from "@material-ui/core";
import { IProjectFields } from "../@types/generated/contentful";

interface StylesProps {
    paddingTop: number | undefined
}

const useStyles = makeStyles((theme) => ({
    /*cardMedia: {
        paddingTop: (props: StylesProps) => props.paddingTop ?? "0" + "%"
    },*/
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
    /*const projectImage = project.media?.[0].fields.file.details.image;
    console.log(projectImage);
    let paddingTop: number | undefined = undefined;
    if(projectImage?.width !== undefined && projectImage.height !== undefined) {
        paddingTop = 100 / (projectImage?.width / projectImage?.height);
    }
    if(project.media?.[0] !== undefined) {
        console.log(project.media[0].fields.file.url);
    }*/
    const styles = useStyles();
    return (
        <Card variant="outlined" className={className}>
            <CardHeader title={project.title} subheader={project.tagline}/>
            {project.media?.[0] !== undefined && (
                /*<CardMedia className={styles.cardMedia} image={project.media[0].fields.file.url} title={project.media[0].fields.title}/>*/
                <img className={styles.cardMedia} src={project.media[0].fields.file.url} title={project.media[0].fields.title}/>
            )}
            {/*<CardContent>
                <Typography>{project.description}</Typography>
            </CardContent>*/}
        </Card>
    )
}