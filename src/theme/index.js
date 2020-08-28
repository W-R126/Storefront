import { createMuiTheme } from '@material-ui/core/styles';

export const THEME = createMuiTheme({
  typography: {
    fontFamily: `"Montserrat", sans-serif`,
  },
  palette: {
    primary: {
      light: '#757ce8',
      main: '#3f50b5',
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
});
