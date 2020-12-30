import { Link, makeStyles, Typography } from '@material-ui/core';
import Head from 'next/head';
import NextLink from 'next/link';

const useStyles = makeStyles((theme) => ({
    githubText: {
        marginTop: "3rem"
    }
}));

export default function Error404() {
    const styles = useStyles();

    return (
        <>
            <Head>
                <title>404 - Page Not Found</title>
            </Head>
            <Typography variant="h2">404 - Page Not Found</Typography>
            <NextLink href="/">
                <Typography variant="h3">
                    <Link href="/">
                        Go to home page
                    </Link>
                </Typography>
            </NextLink>
            <Typography variant="h6" className={styles.githubText}>
                If you think this shouldn't be happening,&nbsp;
                <Link href="https://github.com/merlin04/benjaminsmith.dev">file an issue on GitHub.</Link>
            </Typography>
        </>
    );
}