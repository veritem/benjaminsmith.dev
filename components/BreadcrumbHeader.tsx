import { cloneElement, useEffect, useMemo, useState } from 'react';
import { Breadcrumbs, Link, AppBar, Toolbar, makeStyles, useScrollTrigger, Typography } from "@material-ui/core";
import { MARGIN_CHANGE_BREAKPOINT } from '../src/theme';

const TOOLBAR_BREAKPOINT = 720;

export const useAtTopOfPage = () => useScrollTrigger({
    disableHysteresis: true,
    threshold: 10
});

function ElevationScroll({ children }: { children: React.ReactElement }) {
    const trigger = useAtTopOfPage();

    return cloneElement(children, {
        elevation: trigger ? 4 : 0
    });
}

export function scrollToId(id: string) {
    const element = document.querySelector("#" + id);
    if(element) {
        element.scrollIntoView({ behavior: "smooth" });
    }
}

const useStyles = makeStyles((theme) => ({
    appBar: {
        backgroundColor: "#1b1b1b",
        paddingLeft: "8rem",
        paddingRight: "8rem",
        [theme.breakpoints.down(MARGIN_CHANGE_BREAKPOINT)]: {
            paddingLeft: "4rem",
            paddingRight: "4rem"
        }
    },
    toolbar: {
        paddingLeft: 0,
        paddingRight: 0,
        "& a:hover": {
            cursor: "pointer"
        },
        [theme.breakpoints.down(TOOLBAR_BREAKPOINT)]: {
            "& *": {
                fontSize: "1rem"
            }
        }
    },
    nameLinkContainer: (props: { trigger: boolean, nameWidth: number | undefined }) => ({
        transition: "width 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
        width: props.trigger ? (props.nameWidth ?? 0) + "px" : 0,
        overflow: "hidden",
        whiteSpace: "nowrap",
        display: "flex",
        [theme.breakpoints.down(TOOLBAR_BREAKPOINT)]: {
            display: "none"
        }
    }),
    nameLink: {
        paddingRight: "1rem"
    }
}));

interface BreadcrumbHeaderProps {
    name: string,
    announcementsLast: boolean,
    className?: string
}

declare global {
    interface Window {
        JETBRAINSMONO_LOADED: boolean,
        TEXT_WIDTH: number | undefined
    }
}

if(typeof window !== 'undefined') {
    window.JETBRAINSMONO_LOADED = false;
    window.TEXT_WIDTH = undefined;
}

const HEADER_MEDIA_QUERY = `(max-width: ${TOOLBAR_BREAKPOINT}px)`;

export default function BreadcrumbHeader({ name, announcementsLast, className }: BreadcrumbHeaderProps) {
    const trigger = useAtTopOfPage();
    const [rerenderState, rerender] = useState(false);
    const [smallHeader, setSmallHeader] = useState(() =>
        typeof window !== 'undefined' && window.matchMedia(HEADER_MEDIA_QUERY).matches);

    if(typeof window !== 'undefined' && !window.JETBRAINSMONO_LOADED) {
        // @ts-ignore - fonts exists but TypeScript doesn't know that for some reason
        document.fonts.load('1em JetBrains Mono').then(() => {
            window.JETBRAINSMONO_LOADED = true;
            rerender(!rerenderState);
        });
    }
    
    useEffect(() => {
        const mediaQuery = window.matchMedia(HEADER_MEDIA_QUERY);
        mediaQuery.addEventListener("change", (e) => {
            setSmallHeader(e.matches);
        });
    }, []);

    const nameWidth = useMemo(() => {
        if(typeof window === 'undefined') return undefined;
        const sw = document.getElementById("nameLink")?.scrollWidth;
        if(sw === undefined) return window.TEXT_WIDTH ?? 0;
        window.TEXT_WIDTH = sw;
        return sw;
    }, [typeof window !== 'undefined' && window.JETBRAINSMONO_LOADED, smallHeader]);

    const styles = useStyles({ trigger, nameWidth });

    const announcements = (
        <Link color="inherit" onClick={() => scrollToId("announcements")}>
            Announcements
        </Link>
    );

    return (
        <ElevationScroll>
            <AppBar className={styles.appBar} elevation={trigger ? 4 : 0} color="transparent">
                <Toolbar className={styles.toolbar} variant="dense">
                    <div id="nameLink" className={styles.nameLinkContainer}>
                        <Link className={styles.nameLink} color="inherit" onClick={() => scrollToId("backToTopAnchor")}>
                            <Typography variant="body1">{name}</Typography>
                        </Link>
                    </div>
                    <Breadcrumbs className={className} separator="|">
                        {!announcementsLast && announcements}
                        <Link color="inherit" onClick={() => scrollToId("work")}>
                            Work
                        </Link>
                        <Link color="inherit" onClick={() => scrollToId("projects")}>
                            Projects
                        </Link>
                        <Link color="inherit" onClick={() => scrollToId("awards")}>
                            Awards
                        </Link>
                        {announcementsLast && announcements}
                    </Breadcrumbs>
                </Toolbar>
            </AppBar>
        </ElevationScroll>
    );
}