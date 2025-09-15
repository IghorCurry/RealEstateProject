import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#1A365D", // дорогий грибокий синій
      light: "#2C5282",
      dark: "#153E75",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#8B1538", // дорогий бардовий
      light: "#A91B47",
      dark: "#6B0F2A",
      contrastText: "#ffffff",
    },
    background: {
      default: "#FFFFFF", // білий фон
      paper: "#ffffff",
    },
    text: {
      primary: "#1A365D", // дорогий грибокий синій
      secondary: "#4A5568",
    },
    grey: {
      50: "#fafafa",
      100: "#f5f5f5",
      200: "#eeeeee",
      300: "#e0e0e0",
      400: "#bdbdbd",
      500: "#9e9e9e",
      600: "#757575",
      700: "#616161",
      800: "#424242",
      900: "#212121",
    },
  },
  typography: {
    fontFamily: [
      '"Inter"',
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
    ].join(","),
    h1: {
      fontFamily: ['"Playfair Display"', '"Times New Roman"', "serif"].join(
        ","
      ),
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: "-0.02em",
    },
    h2: {
      fontFamily: ['"Playfair Display"', '"Times New Roman"', "serif"].join(
        ","
      ),
      fontWeight: 600,
      lineHeight: 1.3,
      letterSpacing: "-0.01em",
    },
    h3: {
      fontFamily: ['"Playfair Display"', '"Times New Roman"', "serif"].join(
        ","
      ),
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h4: {
      fontFamily: ['"Playfair Display"', '"Times New Roman"', "serif"].join(
        ","
      ),
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h5: {
      fontFamily: ['"Playfair Display"', '"Times New Roman"', "serif"].join(
        ","
      ),
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h6: {
      fontFamily: ['"Playfair Display"', '"Times New Roman"', "serif"].join(
        ","
      ),
      fontWeight: 600,
      lineHeight: 1.4,
    },
    body1: {
      lineHeight: 1.6,
      letterSpacing: "0.01em",
    },
    body2: {
      lineHeight: 1.6,
      letterSpacing: "0.01em",
    },
    button: {
      fontWeight: 600,
      textTransform: "none",
      letterSpacing: "0.02em",
    },
  },
  shape: {
    borderRadius: 12,
  },
  shadows: [
    "none",
    "0px 2px 1px -1px rgba(0,0,0,0.05),0px 1px 1px 0px rgba(0,0,0,0.05),0px 1px 3px 0px rgba(0,0,0,0.05)",
    "0px 3px 1px -2px rgba(0,0,0,0.08),0px 2px 2px 0px rgba(0,0,0,0.06),0px 1px 5px 0px rgba(0,0,0,0.08)",
    "0px 3px 1px -2px rgba(0,0,0,0.1),0px 2px 2px 0px rgba(0,0,0,0.07),0px 1px 5px 0px rgba(0,0,0,0.1)",
    "0px 2px 4px -1px rgba(0,0,0,0.1),0px 4px 5px 0px rgba(0,0,0,0.07),0px 1px 10px 0px rgba(0,0,0,0.1)",
    "0px 3px 5px -1px rgba(0,0,0,0.12),0px 6px 10px 0px rgba(0,0,0,0.08),0px 1px 18px 0px rgba(0,0,0,0.12)",
    "0px 5px 5px -3px rgba(0,0,0,0.14),0px 8px 10px 1px rgba(0,0,0,0.09),0px 3px 14px 2px rgba(0,0,0,0.14)",
    "0px 5px 5px -3px rgba(0,0,0,0.16),0px 8px 10px 1px rgba(0,0,0,0.1),0px 3px 14px 2px rgba(0,0,0,0.16)",
    "0px 5px 5px -3px rgba(0,0,0,0.18),0px 8px 10px 1px rgba(0,0,0,0.11),0px 3px 14px 2px rgba(0,0,0,0.18)",
    "0px 5px 5px -3px rgba(0,0,0,0.2),0px 8px 10px 1px rgba(0,0,0,0.12),0px 3px 14px 2px rgba(0,0,0,0.2)",
    "0px 6px 6px -3px rgba(0,0,0,0.22),0px 10px 14px 1px rgba(0,0,0,0.13),0px 4px 18px 3px rgba(0,0,0,0.22)",
    "0px 6px 6px -3px rgba(0,0,0,0.24),0px 10px 14px 1px rgba(0,0,0,0.14),0px 4px 18px 3px rgba(0,0,0,0.24)",
    "0px 6px 6px -3px rgba(0,0,0,0.26),0px 10px 14px 1px rgba(0,0,0,0.15),0px 4px 18px 3px rgba(0,0,0,0.26)",
    "0px 6px 6px -3px rgba(0,0,0,0.28),0px 10px 14px 1px rgba(0,0,0,0.16),0px 4px 18px 3px rgba(0,0,0,0.28)",
    "0px 6px 6px -3px rgba(0,0,0,0.3),0px 10px 14px 1px rgba(0,0,0,0.17),0px 4px 18px 3px rgba(0,0,0,0.3)",
    "0px 6px 6px -3px rgba(0,0,0,0.32),0px 10px 14px 1px rgba(0,0,0,0.18),0px 4px 18px 3px rgba(0,0,0,0.32)",
    "0px 6px 6px -3px rgba(0,0,0,0.34),0px 10px 14px 1px rgba(0,0,0,0.19),0px 4px 18px 3px rgba(0,0,0,0.34)",
    "0px 6px 6px -3px rgba(0,0,0,0.36),0px 10px 14px 1px rgba(0,0,0,0.2),0px 4px 18px 3px rgba(0,0,0,0.36)",
    "0px 6px 6px -3px rgba(0,0,0,0.38),0px 10px 14px 1px rgba(0,0,0,0.21),0px 4px 18px 3px rgba(0,0,0,0.38)",
    "0px 6px 6px -3px rgba(0,0,0,0.4),0px 10px 14px 1px rgba(0,0,0,0.22),0px 4px 18px 3px rgba(0,0,0,0.4)",
    "0px 6px 6px -3px rgba(0,0,0,0.42),0px 10px 14px 1px rgba(0,0,0,0.23),0px 4px 18px 3px rgba(0,0,0,0.42)",
    "0px 6px 6px -3px rgba(0,0,0,0.44),0px 10px 14px 1px rgba(0,0,0,0.24),0px 4px 18px 3px rgba(0,0,0,0.44)",
    "0px 6px 6px -3px rgba(0,0,0,0.46),0px 10px 14px 1px rgba(0,0,0,0.25),0px 4px 18px 3px rgba(0,0,0,0.46)",
    "0px 6px 6px -3px rgba(0,0,0,0.48),0px 10px 14px 1px rgba(0,0,0,0.26),0px 4px 18px 3px rgba(0,0,0,0.48)",
    "0px 6px 6px -3px rgba(0,0,0,0.5),0px 10px 14px 1px rgba(0,0,0,0.27),0px 4px 18px 3px rgba(0,0,0,0.5)",
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: "none",
          fontWeight: 600,
          padding: "8px 24px",
          transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
          "&:hover": {
            transform: "translateY(-1px)",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.12)",
          },
        },
        contained: {
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
          "&:hover": {
            boxShadow: "0 4px 16px rgba(0, 0, 0, 0.15)",
          },
        },
        outlined: {
          borderWidth: "2px",
          "&:hover": {
            borderWidth: "2px",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          "&:hover": {
            boxShadow: "0 8px 24px rgba(0, 0, 0, 0.12)",
            transform: "translateY(-4px)",
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 500,
          "&.MuiChip-sizeSmall": {
            height: 24,
            fontSize: "0.75rem",
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 8,
            transition: "all 0.2s ease",
            "&:hover": {
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#1976d2",
              },
            },
            "&.Mui-focused": {
              "& .MuiOutlinedInput-notchedOutline": {
                borderWidth: "2px",
              },
            },
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
          backdropFilter: "blur(8px)",
          backgroundColor: "rgba(255, 255, 255, 0.95)",
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderRadius: "0 16px 16px 0",
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 16,
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.12)",
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          fontWeight: 500,
        },
      },
    },
    MuiCircularProgress: {
      styleOverrides: {
        root: {
          "& .MuiCircularProgress-circle": {
            strokeLinecap: "round",
          },
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          overflow: "visible",
        },
      },
    },
    MuiGrid: {
      styleOverrides: {
        root: {
          overflow: "visible",
        },
      },
    },
  },
});
