import { GetStaticProps } from "next";
import { initializeApollo } from "../src/apolloClient";
import { ResumeDocument, ResumeQuery, ResumeQueryVariables } from "../src/generated/queries";

interface ResumeProps {
    url: string;
}

export default function resume(props: ResumeProps) {
    return <script dangerouslySetInnerHTML={{ __html: `window.location.href="${props.url}"` }} />;
}

export const getStaticProps: GetStaticProps<ResumeProps> = async (context) => {
    const apolloClient = initializeApollo();

    // Items will be added to cache so they can be accessed by the page immediately
    const url = (await apolloClient.query<ResumeQuery, ResumeQueryVariables>({
        query: ResumeDocument
    })).data.assetCollection?.items[0]?.url;

    if (!url) {
        return {
            notFound: true
        };
    }

    return {
        props: {
            url
        },
        revalidate: 10
    }
};