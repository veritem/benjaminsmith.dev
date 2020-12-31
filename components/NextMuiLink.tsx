import NextLink from 'next/link';
import { Link } from '@material-ui/core';

interface NextMuiLinkProps {
    href: string,
    children: React.ReactNode
}

const NextMuiLink = (props: NextMuiLinkProps) => (
    <NextLink href={props.href}>
        <Link href={props.href}>
            {props.children}
        </Link>
    </NextLink>
);

export default NextMuiLink;