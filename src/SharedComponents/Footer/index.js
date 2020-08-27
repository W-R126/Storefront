import React from 'react';
import { Link } from 'react-router-dom';

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const Footer = () => {
  const classes = useStyles();

  return (
    <div fullWidth className={classes.root}>
      <div className={classes.TopSection}>
        <div className={classes.CopyRight}>© Myda 2020.</div>
        <div className={classes.FooterLinkDiv}>
          <Link className={classes.FooterLink}>About Us</Link>
          <Link className={classes.FooterLink}>Our Role</Link>
          <Link className={classes.FooterLink}>Your Data</Link>
          <Link className={classes.FooterLink}>Privacy</Link>
          <Link className={classes.FooterLink}>Terms of Use</Link>
        </div>
      </div>
      <div className={classes.BottomSection}>
        <Link className={classes.FooterLogo}>myda</Link>
      </div>
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#505c69',
      padding: '20px 25px 34px 20px',
      height: '167px',
    },
    TopSection: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    CopyRight: {
      lineHeight: '15px',
      fontSize: '12px',
      color: '#fff',
    },
    FooterLinkDiv: {
      display: 'flex',
      marginLeft: 'auto',
    },
    FooterLink: {
      marginLeft: '40px',
      fontSize: '16px',
      fontWeight: 300,
      color: '#fff',
      textDecoration: 'none',
      '&:hover': {
        textDecoration: 'underline',
      },
    },
    BottomSection: {
      display: 'flex',
      marginTop: 'auto',
    },
    FooterLogo: {
      fontSize: '30px',
      fontWeight: 500,
      color: '#fff',
      textDecoration: 'none',
    },
  })
);
export default Footer;
