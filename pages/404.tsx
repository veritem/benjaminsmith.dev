import { Link, Typography } from '@mui/material';
import Head from 'next/head';
import NextLink from 'next/link';

export default function Error404() {
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
            <Typography variant="h6" sx={{
                marginTop: "3rem"
            }}>
                If you think this shouldn't be happening,&nbsp;
                <Link href="https://github.com/merlin04/benjaminsmith.dev">file an issue on GitHub.</Link>
            </Typography>
        </>
    );
}