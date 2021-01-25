import 'typeface-jetbrains-mono';
import { createMuiTheme } from "@material-ui/core";

// 61rem * 16px
export const MARGIN_CHANGE_BREAKPOINT = 976;

const theme = createMuiTheme({
    palette: {
        type: 'dark',
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
        }
    },
    typography: {
        fontFamily: "JetBrains Mono, monospace",
        fontSize: 16
    },
    spacing: 10,
    overrides: {
        MuiButton: {
            root: {
                border: "1px solid white"
            }
        },
        MuiChip: {
            root: {
                border: "1px solid white",
                borderRadius: 0
            }
        }
    },
    shape: {
        borderRadius: 0
    }
});

export default theme;