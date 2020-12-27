import { IconButton, Link, makeStyles, Tooltip, Typography } from "@material-ui/core";
import { GitHub, Link as LinkIcon, LinkedIn } from "@material-ui/icons";
import { GetStaticProps } from "next";
import Head from "next/head";
import { IProjectFields } from "../@types/generated/contentful";
import Masonry from "../components/Masonry";
import ProjectCard from "../components/ProjectCard";
import { fetchProjects } from "../src/contentful";

interface ProfileButton {
    hoverText: string,
    icon: React.ReactNode,
    href: string
}

const profileButtons: ProfileButton[] = [
    {
        hoverText: "GitHub",
        icon: <GitHub/>,
        href: "https://github.com/merlin04"
    },
    {
        hoverText: "LinkedIn",
        icon: <LinkedIn/>,
        href: "https://www.linkedin.com/in/benjamin-smith-2785bb16b/"
    },
    {
        hoverText: "Website",
        icon: <LinkIcon/>,
        href: "https://benjaminsmith.dev"
    }
];

interface HomeProps {
    projects: IProjectFields[]
}

function calculateSizeMetricForProjectCard(project: IProjectFields) {
    let size = 30;
    if(project.tagline) size += Math.ceil(project.tagline.length / 40) * 40;

    // About 40 characters fit on one line of the tagline
    const imageData = project.media?.[0].fields.file.details.image;
    if(imageData) {
        // This doesn't really need to be this accurate
        let width = 40; // rem
        let height = Math.min(width / (imageData.width / imageData.height), 18); // rem
        // Now width and height contain the correct values in rem
        // Width is correct in characters but height is not
        // 823 / 30 (27.4333...) is the number of pixels in a line
        // 16 is the number of pixels in a rem
        size += width * (16 / ((823 / 30)) * height);
    }

    return size;
}

const useStyles = makeStyles((theme) => ({
    projectCard: {
        display: "inline-block",
        height: "min-content",
        margin: `${theme.spacing(3)}px ${theme.spacing(3)}px 0 0`
    },
    projectCardContainer: {
        maxWidth: "30rem"
    },
    projectsContainer: {
        // Style the div, not the Masonry element, so it works with server side rendering
        marginRight: `-${theme.spacing(3)}px`,
    }
}));

export default function Home({ projects }: HomeProps) {
    const styles = useStyles();

    return (
        <div>
            <Head>
                <title>Benjamin Smith</title>
            </Head>
            <Typography variant="h2">Benjamin Smith</Typography>
            <Typography variant="h4">Full stack developer</Typography>
            {profileButtons.map(item => (
                <Link key={item.hoverText} href={item.href}>
                    <Tooltip title={item.hoverText} aria-label={item.hoverText}>
                        <IconButton>
                            {item.icon}
                        </IconButton>
                    </Tooltip>
                </Link>
            ))}
            <Typography variant="h4">Projects</Typography>
            <div className={styles.projectsContainer}>
                <Masonry
                    maxCols={5}
                    sizeMetrics={projects.map(calculateSizeMetricForProjectCard)}
                    colWidth="30rem"
                    borderWidth="8rem"
                >
                    {projects.map(project => (
                        <div key={project.title} className={styles.projectCardContainer}>
                            <ProjectCard className={styles.projectCard} project={project}/>
                        </div>
                    ))}
                </Masonry>
            </div>
        </div>
    );
}

export const getStaticProps: GetStaticProps<HomeProps> = async (context) => ({
    props: {
        projects: await fetchProjects()
    }
});