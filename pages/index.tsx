import { Button, IconButton, Link, Tooltip, Typography } from "@material-ui/core";
import { GitHub, Link as LinkIcon } from "@material-ui/icons";
import Head from "next/head";

interface ProfileButton {
    hoverText: string,
    icon: React.ReactNode,
    href: string
}

const profileButtons: ProfileButton[] = [
    {
        hoverText: "GitHub",
        icon: <GitHub/>,
        href: "https://github.com/merlin04"
    },
    {
        hoverText: "Website",
        icon: <LinkIcon/>,
        href: "https://benjaminsmith.dev"
    }
] 

export default function Home() {
    return (
        <div>
            <Head>
                <title>Benjamin Smith</title>
            </Head>
            <Typography variant="h2">Benjamin Smith</Typography>
            {profileButtons.map(item => (
                <Link key={item.hoverText} href={item.href}>
                    <Tooltip title={item.hoverText} aria-label={item.hoverText}>
                        <IconButton>
                            {item.icon}
                        </IconButton>
                    </Tooltip>
                </Link>
            ))}
        </div>
    );
}
