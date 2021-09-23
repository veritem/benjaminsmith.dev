import { GetStaticProps } from "next";
import { initializeApollo } from "../src/apolloClient";
import { ResumeDocument, ResumeQuery, ResumeQueryVariables } from "../src/generated/queries";

export default function resume() {
    return null;
}

export const getStaticProps: GetStaticProps<{}> = async (context) => {
    const apolloClient = initializeApollo();

    // Items will be added to cache so they can be accessed by the page immediately
    const res = await apolloClient.query<ResumeQuery, ResumeQueryVariables>({
        query: ResumeDocument
    });

    return {
        props: {},
        redirect: {
            destination: res.data.assetCollection?.items[0]?.url,
            permanent: false
        },
        revalidate: 10
    }
};