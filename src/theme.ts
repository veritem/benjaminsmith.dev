import 'typeface-jetbrains-mono';
import { createTheme } from "@mui/material";

// 61rem * 16px
export const MARGIN_CHANGE_BREAKPOINT = 976;

declare module "@mui/material/styles" {
    interface Palette {
        white: Palette["primary"]
    }
    interface PaletteOptions {
        white: PaletteOptions["primary"]
    }
}

const theme = createTheme({
    palette: {
        mode: "dark",
        divider: "#ffffff",
        primary: {
            main: "#1976d2",
            light: "#63a4ff",
            dark: "#004ba0",
            contrastText: "#ffffff"
        },
        secondary: {
            main: "#00838f",
            light: "#4fb3bf",
            dark: "#005662",
            contrastText: "#ffffff"
        },
        background: {
            paper: "#424242"
        },
        white: {
            main: "#ffffff"
        }
    },
    typography: {
        fontFamily: "JetBrains Mono, monospace",
        fontSize: 16
    },
    spacing: 10,
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    border: "1px solid white",
                    color: "white"
                }
            },
            defaultProps: {
                //@ts-expect-error
                color: "white"
            }
        },
        MuiChip: {
            styleOverrides: {
                root: {
                    // border: "1px solid white",
                    borderRadius: 0
                }
            }
        },
        MuiLink: {
            styleOverrides: {
                root: {
                    textDecoration: "none",
                    "&:hover": {
                        textDecoration: "underline"
                    },
                    color: /* theme.palette.primary.light */ "#63a4ff"
                }
            }
        },
        MuiAccordion: {
            styleOverrides: {
                root: {
                    backgroundImage: "unset"
                }
            }
        }
    },
    shape: {
        borderRadius: 0
    }
});

export default theme;