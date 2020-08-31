import { createMuiTheme } from '@material-ui/core/styles';

export const THEME = createMuiTheme({
  typography: {
    fontFamily: `"Montserrat", sans-serif`,
    button: {
      textTransform: 'none',
    },
  },
  palette: {
    primary: {
      light: '#757ce8',
      main: '#1174f2',
      dark: '#20272f',
      greyBack: '#f3f5f7',
      contrastText: '#fff',
      border: '#bac3c9',
      yellow: '#ffc624',
      title: '#505c69',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
  overrides: {
    MuiTypography: {
      h5: {
        fontSize: '16px',
      },
    },
    MuiButton: {
      containedPrimary: {
        color: '#fff',
        backgroundColor: '#1174f2',
        '&:hover': {
          backgroundImage: 'linear-gradient(to bottom, #0c7ebf, #1174f2)',
          color: '#FFF',
        },
        '&.disabled': {
          opacity: 0.6,
        },
      },
    },
  },
});
