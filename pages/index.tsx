import { Accordion, AccordionDetails, AccordionSummary, IconButton, Link, makeStyles, Tooltip, Typography } from "@material-ui/core";
import { ExpandMore, GitHub, Link as LinkIcon, LinkedIn } from "@material-ui/icons";
import { GetStaticProps } from "next";
import Head from "next/head";
import Masonry from "../components/Masonry";
import ProjectCard from "../components/ProjectCard";
import NextMuiLink from "../components/NextMuiLink";
import { initializeApollo } from "../src/apolloClient";
import { FeaturedProjectIndexFragment, IndexDataDocument, useIndexDataQuery, KeyValuePairDataFragment } from "../src/generated/queries";
import { useMemo, useState } from "react";
import PositionCard from "../components/PositionCard";
import AwardCard from "../components/AwardCard";
import { AnnouncementCard } from "../components/AnnouncementCard";

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
    if(imageData !== undefined && imageData !== null) {
        if(!imageData.width || !imageData.height) {
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
    }

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
    },
    positionPanelContainer: {
        margin: "1rem 0"
    },
    positionPanel: {
        maxWidth: "45rem",
        "&::before": {
            opacity: "0"
        },
        "& > .MuiAccordionSummary-root": {
            display: "none"
        },
        "& .MuiAccordionDetails-root": {
            padding: 0,
            flexDirection: "column"
        },
        
    },
    additionalPositionPanel: {
        // margin 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms is normally applied to the accordion element,
        // it is manually added here so overriding the transition property doesn't remove it
        transition: "border 300ms steps(1, jump-end),margin 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
        border: "0px solid white",
        "&.Mui-expanded": {
            border: "1px solid white",
            transition: "border 0s,margin 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms"
        }
    },
    accordionToggle: {
        marginTop: "0 !important",
        "&::before": {
            opacity: "initial !important"
        },
        "& .MuiAccordionSummary-root": {
            minHeight: "48px"
        },
        "& .MuiAccordionSummary-content": {
            margin: "12px 0"
        }
    },
    awardCard: {
        maxWidth: "45rem",
        marginTop: "1rem"
    },
    awardHeader: {
        marginTop: "1rem"
    }
}));

const getValueFromProfile = (profile: KeyValuePairDataFragment[], key: string) =>
    profile.filter(item => item.key === key)[0].value;

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

function extractValuesFromProfile(profile: KeyValuePairDataFragment[]): ProfileValues {
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

function parseStringDate(date: string) {
    const split = date.split('/');
    switch(split.length) {
        case 3: {
            return new Date(date);
        }
        case 2: {
            return new Date([split[0], "1", split[1]].join('/'));
        }
        case 1: {
            return new Date("01/01/" + split[0]);
        }
        default: {
            throw new Error("Invalid date format: " + date);
        }
    }
}

function sortItemsByDate<T>(items: T[], getDateProperty: {(item: T): string}) {
    return items.slice().sort((a, b) => +parseStringDate(getDateProperty(b)) - +parseStringDate(getDateProperty(a)));
}

export default function Home(props: HomeProps) {
    const styles = useStyles();
    const { data: indexData } = useIndexDataQuery();
    const [additionalPanelsExpanded, setAdditionalPanelsExpanded] = useState(false);
    
    if(indexData === undefined) {
        throw new Error("The IndexData GraphQL query returned undefined");
    }

    const projects = indexData.setOfProjectsCollection?.items[0];

    if(projects === undefined) {
        throw new Error("There are no sets of projects in Contentful, or the GraphQL query failed");
    }

    const profileData = indexData.keyValuePairCollection?.items;

    if(profileData === undefined) {
        throw new Error("KeyValuePairCollection from GraphQL query is undefined");
    }

    const profile = extractValuesFromProfile(profileData);

    // TypeScript insists that I make this a variable instead of just using indexData.positionCollection, not sure why
    const positionCollection = indexData.positionCollection;

    if(positionCollection === undefined || positionCollection === null) {
        throw new Error("PositionCollection from GraphQL query is undefined");
    }

    // Slice is to copy the array so positionCollection isn't mutated
    const sortedPositions = useMemo(() => positionCollection.items.slice().sort((a, b) => +parseStringDate(b.startDate) - +parseStringDate(a.startDate)), []);

    const awards = indexData.awardCollection?.items;

    if(awards === undefined || awards === null) {
        throw new Error("AwardCollection from GraphQL query is undefined");
    }

    const sortedAwards = useMemo(() => sortItemsByDate(awards, (award => award.date ?? "2000")), []);

    const announcements = indexData.setOfAnnouncementsCollection?.items[0].featuredAnnouncementsCollection?.items;

    if(announcements === undefined || announcements === null) {
        throw new Error("There are no sets of announcements in Contentful, or the GraphQL query failed");
    }

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
            {announcements.length > 0 && announcements.map(announcement => <AnnouncementCard key={announcement.information} announcement={announcement}/>)}
            <Typography variant="h4">Work</Typography>
            <div className={styles.positionPanelContainer}>
                <Accordion className={styles.positionPanel} variant="outlined">
                    <AccordionDetails>
                        <PositionCard position={sortedPositions[0]} showPoints={additionalPanelsExpanded}/>
                        <Accordion className={styles.accordionToggle} onChange={(_, expanded) => setAdditionalPanelsExpanded(expanded)}>
                            <AccordionSummary expandIcon={<ExpandMore/>}>
                                <Typography>{additionalPanelsExpanded ? "Show less..." : "View more..."}</Typography>
                            </AccordionSummary>
                        </Accordion>
                    </AccordionDetails>
                </Accordion>
                {sortedPositions.length > 1 && sortedPositions.slice(1).map(position => (
                    <Accordion key={position.company} className={styles.positionPanel + " " + styles.additionalPositionPanel} expanded={additionalPanelsExpanded}>
                        <AccordionSummary/>
                        <AccordionDetails>
                            <PositionCard position={position}/>
                        </AccordionDetails>
                    </Accordion>
                ))}
            </div>
            <Typography variant="h4">Projects</Typography>
            <div className={styles.projectsContainer}>
                <Masonry
                    maxCols={5}
                    sizeMetrics={projects.featuredProjectsCollection.items.map(calculateSizeMetricForProjectCard)}
                    colWidth="30rem"
                    borderWidth="8rem"
                >
                    {projects.featuredProjectsCollection.items.map(project => (
                        <div key={project.title} className={styles.projectCardContainer}>
                            <NextMuiLink href={"/project/" + encodeURIComponent(project.title)}>
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
                            <NextMuiLink href={"/project/" + encodeURIComponent(project.title)}>
                                {project.title} - {project.tagline}
                            </NextMuiLink>
                        </li>
                    ))}
                </ul>
            )}
            {/* Adding the className prop directly to the Typography element breaks CSS SSR for some reason */}
            <div className={styles.awardHeader}>
                <Typography variant="h4">Awards</Typography>
            </div>
            {sortedAwards.map(award => (
                <AwardCard key={award.award + award.organization} className={styles.awardCard} award={award}/>
            ))}
        </div>        
    );
}

export const getStaticProps: GetStaticProps<HomeProps> = async (context) => {
    const apolloClient = initializeApollo();

    // Items will be added to cache so they can be accessed by the page immediately
    await apolloClient.query({
        query: IndexDataDocument
    });

    return {
        props: {
            initialApolloState: apolloClient.cache.extract()
        },
        revalidate: 10
    }
};