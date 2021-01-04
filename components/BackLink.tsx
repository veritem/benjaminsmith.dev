import NextLink from 'next/link';
import { Typography, Link } from '@material-ui/core';

const BackLink = () => (
    <NextLink href="/">
        <Typography variant="h5">
            <Link href="/">
                Go back to home page
            </Link>
        </Typography>
    </NextLink>
);

export default BackLink;