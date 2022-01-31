import NextLink from 'next/link';
import { Link, SxProps } from '@mui/material';

interface NextMuiLinkProps {
    href: string,
    sx?: SxProps,
    children: React.ReactNode
}

const NextMuiLink = (props: NextMuiLinkProps) => (
    <NextLink href={props.href}>
        <Link href={props.href} sx={props.sx}>
            {props.children}
        </Link>
    </NextLink>
);

export default NextMuiLink;