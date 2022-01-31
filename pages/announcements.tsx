import { ApolloStateProps } from ".";
import { GetStaticProps } from "next";
import { initializeApollo } from "../src/apolloClient";
import { AnnouncementsDocument, useAnnouncementsQuery, NameDocument, useNameQuery } from "../src/generated/queries";
import Head from "next/head";
import { AnnouncementCard } from "../components/AnnouncementCard";
import BackLink from "../components/BackLink";
import { Typography, Box } from "@mui/material";

export default function Announcements(props: ApolloStateProps) {
    const { data } = useAnnouncementsQuery();
    const announcements = data?.setOfAnnouncementsCollection?.items[0];
    if(announcements === undefined) throw new Error("GraphQL Announcements is undefined");

    const { data: nameData } = useNameQuery();
    const name = nameData?.keyValuePairCollection?.items[0].value;
    if(name === undefined) throw new Error("GraphQL Name value is undefined");

    return (
        <>
            <Head>
                <title>Announcements | {name}</title>
            </Head>
            <BackLink/>
            <Typography variant="h2">Announcements</Typography>
            <Box sx={{
                marginTop: "1rem",
                "& > *:not(:last-child)": {
                    marginBottom: "1rem"
                }
            }}>
                {[...(announcements.featuredAnnouncementsCollection?.items ?? []), ...(announcements.notFeaturedAnnouncementsCollection?.items ?? [])]
                    .map(announcement => (
                        <AnnouncementCard key={announcement.title ?? "" + announcement.information} announcement={announcement}/>
                    ))
                }
            </Box>
        </>
    );
}

export const getStaticProps: GetStaticProps<ApolloStateProps> = async (context) => {
    const apolloClient = initializeApollo();

    // Items will be added to cache so they can be accessed by the page immediately
    await apolloClient.query({
        query: AnnouncementsDocument
    });

    await apolloClient.query({
        query: NameDocument
    });

    return {
        props: {
            initialApolloState: apolloClient.cache.extract()
        },
        revalidate: 10
    }
};