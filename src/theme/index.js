import { createMuiTheme } from '@material-ui/core/styles';

export const THEME = createMuiTheme({
  typography: {
    fontFamily: `"Montserrat", sans-serif`,
    button: {
      textTransform: 'none',
    },
    h1: {
      fontSize: '22px',
      lineHeight: '27px',
      color: '#505c69',
      fontWeight: 'normal',
    },
    h2: {
      fontSize: '18px',
      fontWeight: 300,
      color: '#505c69',
      lineHeight: '22px',
    },
    h3: {
      fontSize: '16px',
      lineHeight: '19px',
      color: '#505c69',
      fontWeight: 300,
    },
    h4: {
      fontSize: '14px',
      lineHeight: '19px',
      color: '#505c69',
      fontWeight: 300,
    },
    h6: {
      fontSize: '10px',
      lineHeight: '13px',
      color: '#505c69',
      fontWeight: 300,
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
      red: '#f63333',
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
        fontSize: '16px',
        '&:hover': {
          backgroundImage: 'linear-gradient(to bottom, #0c7ebf, #1174f2)',
          color: '#FFF',
        },
        '&.disabled': {
          opacity: 0.6,
        },
      },
      contained: {
        color: '#939da8',
        fontSize: '16px',
        backgroundColor: '#f3f5f7',
      },
    },
  },
});
