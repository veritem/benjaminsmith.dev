import { IconButton, Link, makeStyles, Tooltip, Typography } from "@material-ui/core";
import { GitHub, Link as LinkIcon, LinkedIn } from "@material-ui/icons";
import { GetStaticProps } from "next";
import Head from "next/head";
import Masonry from "../components/Masonry";
import ProjectCard from "../components/ProjectCard";
import NextMuiLink from "../components/NextMuiLink";
import { initializeApollo } from "../src/apolloClient";
import { FeaturedProjectIndexFragment, ProfileDocument, ProfileQuery, ProjectsIndexDocument, useProfileQuery, useProjectsIndexQuery } from "../src/generated/queries";

interface ProfileButton {
    hoverText: string,
    icon: React.ReactNode,
    href: string | null | undefined
}

export interface HomeProps {
    initialApolloState: any
}

function calculateSizeMetricForProjectCard(project: FeaturedProjectIndexFragment) {
    let size = 30;
    if(project.tagline) size += Math.ceil(project.tagline.length / 40) * 40;

    // About 40 characters fit on one line of the tagline
    const imageData = project.mediaCollection?.items[0];
    if(!imageData?.width || !imageData.height) {
        throw new Error("Width or height of image is undefined or 0, is it a different file type?");
    }
    // This doesn't really need to be this accurate
    let width = 40; // rem
    let height = Math.min(width / (imageData.width / imageData.height), 18); // rem
    // Now width and height contain the correct values in rem
    // Width is correct in characters but height is not
    // 823 / 30 (27.4333...) is the number of pixels in a line
    // 16 is the number of pixels in a rem
    size += width * (16 / ((823 / 30)) * height);

    return size;
}

const useStyles = makeStyles((theme) => ({
    projectCard: {
        display: "inline-block",
        height: "min-content",
        margin: `${theme.spacing(3)}px ${theme.spacing(3)}px 0 0`,
        "& img": {
            display: "block"
        },
        transition: "transform 0.3s ease-in-out",
        "&:hover": {
            transform: "scale(1.05)"
        }
    },
    projectCardContainer: {
        maxWidth: "30rem"
    },
    projectsContainer: {
        // Style the div, not the Masonry element, so it works with server side rendering
        marginRight: `-${theme.spacing(3)}px`,
    },
    otherProjectsContainer: {
        fontSize: "1.5rem",
        "& a": {
            color: "white"
        }
    }
}));

const getValueFromProfile = (profile: ProfileQuery, key: string) =>
    profile.keyValuePairCollection?.items.filter(item => item.key === key)[0].value;

export interface ProfileValues {
  /** Name */
  name: string;

  /** Tagline */
  tagline: string;

  /** GitHub URL */
  gitHubUrl: string;

  /** LinkedIn URL */
  linkedInUrl: string;

  /** Website URL */
  websiteUrl: string;
}

function extractValuesFromProfile(profile: ProfileQuery): ProfileValues {
    let values: ProfileValues = {
        name: "Name",
        tagline: "Tagline",
        gitHubUrl: "GitHub URL",
        linkedInUrl: "LinkedIn URL",
        websiteUrl: "Website URL"
    };

    Object.entries(values).forEach((item: string[]) => {
        const value = getValueFromProfile(profile, item[1]);
        if(value === undefined) {
            throw new Error(`${item[1]} is undefined`);
        }
        // @ts-ignore
        values[item[0]] = value;
    });

    return values;
}

export default function Home(props: HomeProps) {
    const styles = useStyles();
    const { data: profileData } = useProfileQuery();
    const { data: projectsData} = useProjectsIndexQuery();

    if(profileData === undefined || projectsData === undefined) {
        throw new Error("One or more GraphQL queries returned undefined");
    }

    const projects = projectsData.setOfProjectsCollection?.items[0];

    if(projects === undefined) {
        throw new Error("There are no sets of projects in Contentful, or the GraphQL query failed");
    }

    const profile = extractValuesFromProfile(profileData);

    const profileButtons: ProfileButton[] = [
        {
            hoverText: "GitHub",
            icon: <GitHub/>,
            href: profile.gitHubUrl
        },
        {
            hoverText: "LinkedIn",
            icon: <LinkedIn/>,
            href: profile.linkedInUrl
        },
        {
            hoverText: "Website",
            icon: <LinkIcon/>,
            href: profile.websiteUrl
        }
    ];

    return (
        <div>
            <Head>
                <title>{profile.name}</title>
            </Head>
            <Typography variant="h2">{profile.name}</Typography>
            <Typography variant="h4">{profile.tagline}</Typography>
            {profileButtons.map(item => (
                <Link key={item.hoverText} href={item.href ?? undefined}>
                    <Tooltip title={item.hoverText} aria-label={item.hoverText}>
                        <IconButton>
                            {item.icon}
                        </IconButton>
                    </Tooltip>
                </Link>
            ))}
            <Typography variant="h4">Projects</Typography>
            {/*<Typography variant="h6">Featured</Typography>*/}
            <div className={styles.projectsContainer}>
                <Masonry
                    maxCols={5}
                    sizeMetrics={projects.featuredProjectsCollection.items.map(calculateSizeMetricForProjectCard)}
                    colWidth="30rem"
                    borderWidth="8rem"
                >
                    {projects.featuredProjectsCollection.items.map(project => (
                        <div key={project.title} className={styles.projectCardContainer}>
                            <NextMuiLink href={"/project/" + project.title}>
                                <ProjectCard className={styles.projectCard} project={project}/>
                            </NextMuiLink>
                        </div>
                    ))}
                </Masonry>
            </div>
            {projects.notFeaturedProjectsCollection && projects.notFeaturedProjectsCollection.items.length > 0 && (
                <ul className={styles.otherProjectsContainer}>
                    {projects.notFeaturedProjectsCollection.items.map(project => (
                        <li key={project.title}>
                            <NextMuiLink href={"/project/" + project.title}>
                                {project.title} - {project.tagline}
                            </NextMuiLink>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export const getStaticProps: GetStaticProps<HomeProps> = async (context) => {
    const apolloClient = initializeApollo();

    // Items will be added to cache so they can be accessed by the page immediately
    await apolloClient.query({
        query: ProfileDocument
    });

    await apolloClient.query({
        query: ProjectsIndexDocument
    });

    return {
        props: {
            initialApolloState: apolloClient.cache.extract()
        },
        revalidate: 10
    }
};