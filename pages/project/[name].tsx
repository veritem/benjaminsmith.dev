import { GitHub, Group, Link as LinkIcon } from '@mui/icons-material';
import { Box, Button, Chip, LinearProgress, Link, SxProps, Typography } from '@mui/material';
import { GetStaticPaths, GetStaticProps } from 'next';
import { NextSeo } from 'next-seo';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import BackLink from '../../components/BackLink';
import ImageGallery, { MakeRequired } from '../../components/ImageGallery';
import MarkdownRenderer from '../../components/MarkdownRenderer';
import { initializeApollo } from '../../src/apolloClient';
import { NameDocument, ProjectAssetFragment, ProjectNamesDocument, ProjectNamesQuery, ProjectNamesQueryVariables, ProjectPageDocument, ProjectPageQuery, ProjectPageQueryVariables, useNameQuery, useProjectPageQuery } from '../../src/generated/queries';
import Error404 from '../404';
import { ApolloStateProps } from '../index';

const linkButtonStyles: SxProps = {
    textTransform: "none",
    paddingLeft: "calc(1rem + 4px)",
    paddingRight: "1rem"
};

const writtenList = (list: string[]) =>
    [...list.slice(0, list.length - 1), "and " + list[list.length - 1]]
        .join(list.length > 2 ? ", " : " ");

export default function Project() {
    const router = useRouter();

    if (router.isFallback) {
        return <LinearProgress />;
    }

    const { name: projectName } = router.query;

    if (projectName === undefined || Array.isArray(projectName)) return <Error404 />;

    const { data } = useProjectPageQuery({
        variables: {
            project: decodeURIComponent(projectName)
        }
    });
    const project = data?.projectCollection?.items[0];

    if (!project) return <Error404 />;

    const { data: nameData } = useNameQuery();
    const name = nameData?.keyValuePairCollection?.items[0].value;

    if (name === undefined) throw new Error("GraphQL Name value is undefined");

    const media: MakeRequired<ProjectAssetFragment>[] | undefined = useMemo(() => {
        if (!project.mediaCollection?.items[0]) return undefined;
        return project.mediaCollection.items
            // TypeScript doesn't understand that this filters out null values
            .filter(item => item && item.url && item.width && item.height) as MakeRequired<ProjectAssetFragment>[];
    }, []);

    const SEO = {
        title: project.title,
    }

    return (
        <>
            <NextSeo {...SEO} />
            <Head>
                <title>{project.title} | {name}</title>
            </Head>
            <BackLink />
            <Typography variant="h2">{project.title}</Typography>
            {project.tagline && (
                <Typography variant="h4">{project.tagline}</Typography>
            )}
            {project.collaborators && project.collaborators.length > 0 && (
                <Typography variant="body1" sx={{
                    marginTop: "0.5rem",
                    "& svg": {
                        verticalAlign: "bottom",
                        marginRight: "0.5rem"
                    }
                }}><Group />with {writtenList(project.collaborators)}</Typography>
            )}
            {project.skillsCollection?.items[0] && (
                <Box sx={{
                    marginTop: "1rem",
                    "& > *:not(:last-child)": {
                        marginRight: "1rem"
                    }
                }}>
                    {project.skillsCollection.items.map(skill => (
                        <Chip key={skill.title} variant="outlined" label={skill.title} />
                    ))}
                </Box>
            )}
            <Box sx={{
                marginTop: "1rem",
                "& > *:not(:last-child)": {
                    marginRight: "1rem"
                }
            }}>
                {project.url && (
                    <Link href={project.url}>
                        <Button sx={linkButtonStyles} startIcon={<LinkIcon />}>Project website</Button>
                    </Link>
                )}
                {project.codeUrl && (
                    <Link href={project.codeUrl}>
                        <Button sx={linkButtonStyles} startIcon={<GitHub />}>Project code</Button>
                    </Link>
                )}
            </Box>

            {media && (
                <ImageGallery sx={{
                    marginTop: "1rem"
                }} srcs={media} />
            )}
            {project.description && (
                <MarkdownRenderer text={project.description} />
            )}
        </>
    )
}

export const getStaticProps: GetStaticProps<ApolloStateProps> = async (context) => {
    const apolloClient = initializeApollo();

    if (context.params?.name !== undefined && !Array.isArray(context.params.name)) {
        await apolloClient.query<ProjectPageQuery, ProjectPageQueryVariables>({
            query: ProjectPageDocument,
            variables: {
                project: context.params.name
            }
        });

        await apolloClient.query({
            query: NameDocument
        });
    }

    return {
        props: {
            initialApolloState: apolloClient.cache.extract()
        },
        revalidate: 10
    };
}

// if(data.projectCollection ?? undefined === undefined) throw new Error("ProjectNames query returned an undefined projectCollection");

// if(data.projectCollection === null) throw new Error();
// if(data.projectCollection === undefined) throw new Error();

export const getStaticPaths: GetStaticPaths = async () => {
    const apolloClient = initializeApollo();
    const { data } = await apolloClient.query<ProjectNamesQuery, ProjectNamesQueryVariables>({
        query: ProjectNamesDocument
    });

    if (data.projectCollection === null || data.projectCollection === undefined) {
        throw new Error("ProjectNames query returned an undefined projectCollection");
    }

    return {
        paths: data.projectCollection.items.map(projectName => ({
            params: {
                name: encodeURIComponent(projectName.title)
            }
        })),
        fallback: true
    };
}
