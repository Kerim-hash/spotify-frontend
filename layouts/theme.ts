import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
    palette: {
        primary: {
            main: '#6FD862',
        },
        secondary: {
            main: '#201640',
        },
        action: {
            main: '#fff',
        },
        mode: 'dark',
    },
    components: {
        MuiSlider: {
            styleOverrides: {
                root: {
                    "& .MuiSlider-thumb:hover": {
                        color: '#6FD862'
                    }
                }
            }
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    height: 45,
                    textTransform: 'none',
                    borderRadius: 30,
                    fontSize: 16,
                    fontWeight: 700,
                    color: '#fff',
                    "&.MuiButton-outlined.MuiButton-outlinedSizeSmall": {
                        height: 35,
                    },
                    "&.MuiButton-contained": {
                        height: 35,
                        color: "black",
                        background: 'white'
                    },
                    "&.MuiLoadingButton-root": {
                        height: 35,
                        color: "white",
                        background: 'black'
                    },
                },
            },
        },
    }
});