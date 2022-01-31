import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    IconButton,
    Link,
    Tooltip,
    Typography,
    Card,
    CardContent,
    Box,
    SxProps,
} from "@mui/material";
import { ExpandMore, GitHub, Link as LinkIcon, LinkedIn } from "@mui/icons-material";
import { GetStaticProps } from "next";
import Head from "next/head";
import Masonry from "../components/Masonry";
import ProjectCard from "../components/ProjectCard";
import NextMuiLink from "../components/NextMuiLink";
import { initializeApollo } from "../src/apolloClient";
import { FeaturedProjectIndexFragment, IndexDataDocument, useIndexDataQuery, KeyValuePairDataFragment, PositionIndexFragment } from "../src/generated/queries";
import { useMemo, useState } from "react";
import PositionCard from "../components/PositionCard";
import AwardCard from "../components/AwardCard";
import { AnnouncementCard } from "../components/AnnouncementCard";
import BreadcrumbHeader from "../components/BreadcrumbHeader";
import theme, { MARGIN_CHANGE_BREAKPOINT } from "../src/theme";
import Footer, { WebringMember, wrDataToUrls } from "../components/Footer";

interface ProfileButton {
    hoverText: string,
    icon: React.ReactNode,
    href: string | null | undefined
}

export interface ApolloStateProps {
    initialApolloState: any
}

interface HomeProps extends ApolloStateProps {
    webringUrls: string[]
}

const COOL_TIMING_FUNCTION = "cubic-bezier(.17,.84,.44,1)";

// https://stackoverflow.com/a/51506718
const wrap = (s: string, w: number) => s.replace(
    new RegExp(`(?![^\\n]{1,${w}}$)([^\\n]{1,${w}})\\s`, 'g'), '$1\n'
);

// In all of these constants em is actually rem

const PX_IN_EM = 16;
// The empty card is 69.7 px tall
const EMPTY_CARD_HEIGHT_IN_EM = 69.7 / PX_IN_EM;
const TITLE_LINE_HEIGHT_IN_EM = 36.5833 / PX_IN_EM;
const TAGLINE_LINE_HEIGHT_IN_EM = (823 / 30) / PX_IN_EM;
const TITLE_CHARACTERS_PER_LINE = 25;
const TAGLINE_CHARACTERS_PER_LINE = 40;
const IMAGE_HORIZONTAL_PADDING_IN_EM = 2;
const IMAGE_VERTICAL_PADDING_IN_EM = IMAGE_HORIZONTAL_PADDING_IN_EM;
// 28rem - 2rem padding
const IMAGE_MAX_WIDTH_IN_EM = 28 - IMAGE_HORIZONTAL_PADDING_IN_EM;
// 18rem - 2rem padding
const IMAGE_MAX_HEIGHT_IN_EM = 18 - IMAGE_VERTICAL_PADDING_IN_EM;

function calculateSizeMetricForProjectCard(project: FeaturedProjectIndexFragment) {
    // The initial version used the width of one character in the tagline as the unit for some reason
    // and it returned the number of characters, but converted the image to the equivalent number
    // of characters and did some rounding to make it really in units of lines?????
    // This time I'll do this in a way that actually makes sense

    let size = EMPTY_CARD_HEIGHT_IN_EM;
    // Wrap the text and figure out how many lines it takes up, then figure out how tall it is in em
    size += (wrap(project.title, TITLE_CHARACTERS_PER_LINE).split("\n").length) * TITLE_LINE_HEIGHT_IN_EM;
    // Do the same for the tagline
    if(project.tagline) size += (wrap(project.tagline, TAGLINE_CHARACTERS_PER_LINE).split("\n").length) * TAGLINE_LINE_HEIGHT_IN_EM;

    const imageData = project.mediaCollection?.items[0];
    if(imageData) {
        if(!imageData.width || !imageData.height) {
            throw new Error("Width or height of image is undefined or 0, is it a different file type?");
        }
        size += IMAGE_VERTICAL_PADDING_IN_EM;
        size += Math.min(IMAGE_MAX_WIDTH_IN_EM / (imageData.width / imageData.height), IMAGE_MAX_HEIGHT_IN_EM);
    }

    return size;
}

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

// Sort the positions so that at the beginning are the positions with an undefined endDate (sorted by their startDate from most recent to oldest), then all the others sorted by their startDate from most recent to oldest
function sortPositions(positions: PositionIndexFragment[]): PositionIndexFragment[] {
    // Split the positions into two arrays, one with the positions with an undefined endDate and the other for the others
    return positions.reduce<[PositionIndexFragment[], PositionIndexFragment[]]>((accumulator, position) => {
        accumulator[position.endDate ? 1 : 0].push(position);
        return accumulator;
    }, [[], []])
        .map((positions) => positions.sort((a, b) => +parseStringDate(b.startDate) - +parseStringDate(a.startDate)))
        .flat();
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

const positionPanelStyles: SxProps = {
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
    }
};

const announcementCardStyles: SxProps = {
    margin: "0 -8rem",
    [theme.breakpoints.down(MARGIN_CHANGE_BREAKPOINT)]: {
        margin: "0 -4rem"
    },
    border: 0,
    backgroundColor: theme.palette.primary.dark,
    "& a": {
        color: theme.palette.primary.light + " !important"
    },
    "&:not(:first-child)": {
        borderTop: "1px solid " + theme.palette.primary.light
    }
};

const ScrollAnchor = ({ id }: { id: string }) => (
    <Box id={id} sx={{
        position: "relative",
        top: "-4.5rem"
    }} />
)

export default function Home(props: HomeProps) {
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
    const sortedPositions = useMemo(() => sortPositions(positionCollection.items), []);

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
        }
    ];

    return (
        <div>
            <Head>
                <title>{profile.name}</title>
            </Head>
            <Box id="backToTopAnchor" sx={{
                position: "relative",
                top: "-8rem"
            }} />
            <BreadcrumbHeader name={profile.name} announcementsLast={announcements.length === 0}/>
            <Typography variant="h2">{profile.name}</Typography>
            <Typography variant="h4">{profile.tagline}</Typography>
            {profileButtons.map(item => (
                <Link key={item.hoverText} href={item.href ?? undefined}>
                    <Tooltip title={item.hoverText} aria-label={item.hoverText}>
                        <IconButton size="large">
                            {item.icon}
                        </IconButton>
                    </Tooltip>
                </Link>
            ))}
            {announcements.length > 0 && (
                <>
                    <ScrollAnchor id="announcements" />
                    <Box sx={{
                        margin: "1rem 0"
                    }}>
                        {announcements.map(announcement => (
                            <AnnouncementCard sx={announcementCardStyles} key={announcement.information} announcement={announcement}/>
                        ))}
                        <Card sx={announcementCardStyles} variant="outlined">
                            <CardContent sx={{
                                paddingBottom: "1rem !important"
                            }}>
                                <NextMuiLink href="/announcements">View more announcements...</NextMuiLink>
                            </CardContent>
                        </Card>
                    </Box>
                </>
            )}
            <ScrollAnchor id="work" />
            <Typography variant="h4">Work</Typography>
            <Box sx={{
                margin: "1rem 0"
            }}>
                <Accordion sx={positionPanelStyles} variant="outlined">
                    <AccordionDetails>
                        <PositionCard position={sortedPositions[0]} showPoints={additionalPanelsExpanded}/>
                        <Accordion sx={{
                            marginTop: "0 !important",
                            "&::before": {
                                opacity: "initial !important"
                            },
                            "& .MuiAccordionSummary-root": {
                                minHeight: "48px !important"
                            },
                            "& .MuiAccordionSummary-content": {
                                margin: "12px 0 !important"
                            }
                        }} onChange={(_, expanded) => {
                            setAdditionalPanelsExpanded(expanded);
                        }}>
                            <AccordionSummary expandIcon={<ExpandMore/>} onClick={() => {
                                if (document.activeElement instanceof HTMLElement) {
                                    document.activeElement.blur();
                                }
                            }}>
                                <Typography>{additionalPanelsExpanded ? "Show less..." : "View more..."}</Typography>
                            </AccordionSummary>
                        </Accordion>
                    </AccordionDetails>
                </Accordion>
                {sortedPositions.length > 1 && sortedPositions.slice(1).map(position => (
                    <Accordion sx={{
                        ...positionPanelStyles,
                        // margin 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms is normally applied to the accordion element,
                        // it is manually added here so overriding the transition property doesn't remove it
                        transition: "border 300ms steps(1, jump-end),margin 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms !important",
                        border: "0px solid white !important",
                        "&.Mui-expanded": {
                            border: "1px solid white !important",
                            transition: "border 0s,margin 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms !important"
                        }
                    }} key={position.company} expanded={additionalPanelsExpanded}>
                        <AccordionSummary/>
                        <AccordionDetails>
                            <PositionCard position={position}/>
                        </AccordionDetails>
                    </Accordion>
                ))}
            </Box>
            <ScrollAnchor id="projects" />
            <Typography variant="h4">Projects</Typography>
            <Box sx={{
                // Style the div, not the Masonry element, so it works with server side rendering
                marginRight: theme.spacing(-3),
            }}>
                <Masonry
                    maxCols={5}
                    sizeMetrics={projects.featuredProjectsCollection.items.map(calculateSizeMetricForProjectCard)}
                    colWidth="30rem"
                    borderWidth="8rem"
                >
                    {projects.featuredProjectsCollection.items.map(project => (
                        <Box key={project.title} sx={{
                            maxWidth: "30rem"
                        }}>
                            <NextMuiLink href={"/project/" + encodeURIComponent(project.title)}>
                                <ProjectCard sx={{
                                    display: "inline-block",
                                    height: "min-content",
                                    margin: `${theme.spacing(3)} ${theme.spacing(3)} 0 0`,
                                    "& img": {
                                        display: "block"
                                    },
                                    transition: `transform 0.3s ${COOL_TIMING_FUNCTION}`,
                                    "&:hover": {
                                        transform: "scale(1.05)"
                                    }                                    
                                }} project={project}/>
                            </NextMuiLink>
                        </Box>
                    ))}
                </Masonry>
            </Box>
            {projects.notFeaturedProjectsCollection && projects.notFeaturedProjectsCollection.items.length > 0 && (
                <Box component="ul" sx={{
                    fontSize: "1.5rem",
                    "& a": {
                        color: "white"
                    }            
                }}>
                    {projects.notFeaturedProjectsCollection.items.map(project => (
                        <li key={project.title}>
                            <NextMuiLink href={"/project/" + encodeURIComponent(project.title)}>
                                {project.title} - {project.tagline}
                            </NextMuiLink>
                        </li>
                    ))}
                </Box>
            )}
            {/* Adding the className prop directly to the Typography element breaks CSS SSR for some reason */}
            <Box sx={{
                marginTop: "1rem"
            }}>
                <ScrollAnchor id="awards" />
                <Typography variant="h4">Awards</Typography>
            </Box>
            {sortedAwards.map(award => (
                <AwardCard sx={{
                    maxWidth: "45rem",
                    marginTop: "1rem"            
                }} key={award.award + award.organization} award={award}/>
            ))}
            {announcements.length === 0 && (
                <>
                    <Box sx={{
                        marginTop: "1rem"
                    }}>
                        <ScrollAnchor id="announcements" />
                        <Typography variant="h4">Announcements</Typography>
                    </Box>
                    <Typography variant="body1">There are no announcements at this time.</Typography>
                    <NextMuiLink href="/announcements">View past announcements...</NextMuiLink>
                </>
            )}
            <Footer prevUrl={props.webringUrls[0]} nextUrl={props.webringUrls[1]}/>
        </div>
    );
}

export const getStaticProps: GetStaticProps<HomeProps> = async (context) => {
    const apolloClient = initializeApollo();

    // Items will be added to cache so they can be accessed by the page immediately
    await apolloClient.query({
        query: IndexDataDocument
    });

    const webringRes = await fetch("https://webring.hackclub.com/public/members.json");
    const webringData: WebringMember[] = await webringRes.json();

    return {
        props: {
            initialApolloState: apolloClient.cache.extract(),
            webringUrls: wrDataToUrls(webringData)
        },
        revalidate: 10
    }
};