import 'typeface-jetbrains-mono';
import { createMuiTheme } from "@material-ui/core";

const theme = createMuiTheme({
    palette: {
        type: 'dark',
        divider: "#ffffff"
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
        }
    },
    shape: {
        borderRadius: 0
    }
});

export default theme;