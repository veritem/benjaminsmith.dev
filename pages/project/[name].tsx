import { Link, Typography } from '@material-ui/core';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import Head from 'next/head';
import NextLink from 'next/link';
import { initializeApollo } from '../../src/apolloClient';
import { ProjectPageDocument, ProjectPageQuery, ProjectPageQueryVariables, useProjectPageQuery } from '../../src/generated/queries';
import { HomeProps } from '../index';
import Error404 from '../404';

export default function Project() {
    const router = useRouter();
    const { name } = router.query;
    
    if(name === undefined || Array.isArray(name)) return <Error404 />;

    const { data } = useProjectPageQuery({
        variables: {
            project: name
        }
    });
    const project = data?.projectCollection?.items[0];

    if(!project) return <Error404 />;

    return (
        <>
            <Head>
                <title>{project.title} | Benjamin Smith</title>
            </Head>
            <NextLink href="/">
                <Typography variant="h5">
                    <Link href="/">
                        Go back to home page
                    </Link>
                </Typography>
            </NextLink>
            <Typography variant="h1">{project.title}</Typography>
        </>
    )
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async (context) => {
    const apolloClient = initializeApollo();

    if(context.query.name !== undefined && !Array.isArray(context.query.name)) {
        await apolloClient.query<ProjectPageQuery, ProjectPageQueryVariables>({
            query: ProjectPageDocument,
            variables: {
                project: context.query.name
            }
        });
    }

    return {
        props: {
            initialApolloState: apolloClient.cache.extract()
        }
    };
}