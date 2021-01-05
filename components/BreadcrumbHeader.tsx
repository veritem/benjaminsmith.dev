import { cloneElement, useMemo } from 'react';
import { Breadcrumbs, Link, AppBar, Toolbar, makeStyles, useScrollTrigger, Slide, Typography } from "@material-ui/core";

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
        paddingRight: "8rem"
    },
    toolbar: {
        paddingLeft: 0,
        paddingRight: 0
    },
    nameLinkContainer: (props: { trigger: boolean, nameWidth: number | undefined }) => ({
        transition: "width 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
        width: props.trigger ? (props.nameWidth ?? 0) + "px" : 0,
        overflow: "hidden",
        whiteSpace: "nowrap",
        display: "flex"
    }),
    nameLink: {
        paddingRight: "1rem"
    }
}));

interface BreadcrumbHeaderProps {
    name: string,
    className?: string
}

declare global {
    interface Window {
        JETBRAINSMONO_LOADED: boolean
    }
}

if(typeof window !== 'undefined') {
    window.JETBRAINSMONO_LOADED = false;
}

export default function BreadcrumbHeader({ name, className }: BreadcrumbHeaderProps) {
    const trigger = useAtTopOfPage();

    if(typeof window !== 'undefined' && !window.JETBRAINSMONO_LOADED) {
        // @ts-ignore - fonts exists but TypeScript doesn't know that for some reason
        window.JETBRAINSMONO_LOADED = document.fonts.check('1em JetBrains Mono');
    }

    const nameWidth = useMemo(() => {
        if(typeof window === 'undefined') return undefined;
        return document.getElementById("nameLink")?.scrollWidth;
    }, [typeof window !== 'undefined' && window.JETBRAINSMONO_LOADED]);
    const styles = useStyles({ trigger, nameWidth });

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
                        <Link color="inherit" onClick={() => scrollToId("announcements")}>
                            Announcements
                        </Link>
                        <Link color="inherit" onClick={() => scrollToId("work")}>
                            Work
                        </Link>
                        <Link color="inherit" onClick={() => scrollToId("projects")}>
                            Projects
                        </Link>
                        <Link color="inherit" onClick={() => scrollToId("awards")}>
                            Awards
                        </Link>
                    </Breadcrumbs>
                </Toolbar>
            </AppBar>
        </ElevationScroll>
    );
}