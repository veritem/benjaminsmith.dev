import { Button, Chip, LinearProgress, Link, makeStyles, Typography } from '@material-ui/core';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { initializeApollo } from '../../src/apolloClient';
import { NameDocument, ProjectPageDocument, ProjectPageQuery, ProjectPageQueryVariables, useNameQuery, useProjectPageQuery, ProjectNamesQuery, ProjectNamesQueryVariables, ProjectNamesDocument } from '../../src/generated/queries';
import { ApolloStateProps } from '../index';
import Error404 from '../404';
import ImageGallery from '../../components/ImageGallery';
import { useMemo } from 'react';
import { Link as LinkIcon, GitHub, Group } from '@material-ui/icons';
import MarkdownRenderer from '../../components/MarkdownRenderer';
import BackLink from '../../components/BackLink';

interface MediaItem {
    url: string,
    title: string | null | undefined
}

const useStyles = makeStyles((theme) => ({
    gallery: {
        marginTop: "1rem"
    },
    linkButton: {
        textTransform: "none",
        paddingLeft: "calc(1rem + 4px)",
        paddingRight: "1rem"
    },
    buttonsContainer: {
        marginTop: "1rem",
        "& > *:not(:last-child)": {
            marginRight: "1rem"
        }
    },
    collaborators: {
        marginTop: "0.5rem",
        "& svg": {
            verticalAlign: "bottom",
            marginRight: "0.5rem"
        }
    }
}));

const writtenList = (list: string[]) => 
    [...list.slice(0, list.length - 1), "and " + list[list.length - 1]]
    .join(list.length > 2 ? ", " : " ");

export default function Project() {
    const styles = useStyles();
    const router = useRouter();

    if(router.isFallback) {
        return <LinearProgress />;
    }

    const { name: projectName } = router.query;
    
    if(projectName === undefined || Array.isArray(projectName)) return <Error404 />;

    const { data } = useProjectPageQuery({
        variables: {
            project: decodeURIComponent(projectName)
        }
    });
    const project = data?.projectCollection?.items[0];

    if(!project) return <Error404 />;

    const { data: nameData } = useNameQuery();
    const name = nameData?.keyValuePairCollection?.items[0].value;

    if(name === undefined) throw new Error("GraphQL Name value is undefined");

    let media: MediaItem[] | undefined = useMemo(() => {
        if(!project.mediaCollection?.items[0]) return undefined;
        return project.mediaCollection.items
            // TypeScript doesn't understand that this filters out null values
            .filter(item => item !== null && (item.url ?? undefined) !== undefined) as MediaItem[];
    }, []);

    return (
        <>
            <Head>
                <title>{project.title} | {name}</title>
            </Head>
            <BackLink/>
            <Typography variant="h2">{project.title}</Typography>
            {project.tagline && (
                <Typography variant="h4">{project.tagline}</Typography>
            )}
            {project.collaborators && project.collaborators.length > 0 && (
                <Typography variant="body1" className={styles.collaborators}><Group/>with {writtenList(project.collaborators)}</Typography>
            )}
            {project.skillsCollection?.items[0] && (
                <div className={styles.buttonsContainer}>
                    {project.skillsCollection.items.map(skill => (
                        <Chip key={skill.title} variant="outlined" label={skill.title}/>
                    ))}
                </div>
            )}
            <div className={styles.buttonsContainer}>
                {project.url && (
                    <Link href={project.url}>
                        <Button className={styles.linkButton} startIcon={<LinkIcon/>}>Project website</Button>
                    </Link>
                )}
                {project.codeUrl && (
                    <Link href={project.codeUrl}>
                        <Button className={styles.linkButton} startIcon={<GitHub/>}>Project code</Button>
                    </Link>
                )}
            </div>
            
            {media && (
                <ImageGallery className={styles.gallery} srcs={media.map(item => item.url)} />
            )}
            {project.description && (
                <MarkdownRenderer text={project.description}/>
            )}
        </>
    )
}

export const getStaticProps: GetStaticProps<ApolloStateProps> = async (context) => {
    const apolloClient = initializeApollo();

    if(context.params?.name !== undefined && !Array.isArray(context.params.name)) {
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

    if(data.projectCollection === null || data.projectCollection === undefined) {
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