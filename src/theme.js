import { createTheme } from '@mui/material/styles';

const darkColoredTheme = createTheme({
  palette: {
    primary: {
      main: '#FF5733', // Example primary color (orange/red)
    },
    secondary: {
      main: '#000000', // Example secondary color (black)
    },
    background: {
      default: '#f5f5f5', // Example background color (light gray/white)
    },
    text: {
      primary: '#000000', // Primary text color (black)
      secondary: '#808080', // Secondary text color (gray)
    },
  },
  typography: {
    h4: {
      fontWeight: 600,
      color: '#000000', // Main header color (black)
    },
    body1: {
      color: '#808080', // Body text color (gray)
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: '#FF5733', // Button color (orange/red)
          color: '#ffffff', // Button text color (white)
          '&:hover': {
            backgroundColor: '#FF451A', // Darker shade for hover
          },
        },
      },
    },
  },
});

export default darkColoredTheme;
