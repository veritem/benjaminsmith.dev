import { Card, CardHeader, Box, CardProps } from "@mui/material";
import { FeaturedProjectIndexFragment } from "../src/generated/queries";

interface ProjectCardProps {
    project: FeaturedProjectIndexFragment
}

export default function ProjectCard({ project, ...cardProps }: ProjectCardProps & CardProps) {
    return (
        <Card variant="outlined" {...cardProps}>
            <CardHeader title={project.title} subheader={project.tagline}/>
            {project.mediaCollection?.items[0] && (
                <Box sx={{
                    backgroundColor: "#202020",
                    "& img": {
                        maxWidth: "100%",
                        maxHeight: "18rem",
                        marginLeft: "auto",
                        marginRight: "auto",
                        padding: "1rem"
                    }
                }}>
                    <img src={project.mediaCollection.items[0].url ?? undefined} title={project.mediaCollection.items[0].title ?? undefined}/>
                </Box>
            )}
        </Card>
    )
}