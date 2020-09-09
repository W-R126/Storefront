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
      light: '#2a88ff',
      main: '#1174f2',
      dark: '#0e60c9',
      greyBack: '#f3f5f7',
      contrastText: '#fff',
      border: '#bac3c9',
      yellow: '#ffc624',
      title: '#505c69',
      text: '#20272f',
      text1: '#ba000d',
    },
    secondary: {
      light: '#2a88ff',
      main: '#1174f2',
      dark: '#0e60c9',
      contrastText: '#000',
      greyBack: 'rgba(186, 195, 201, 0.3)',
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
