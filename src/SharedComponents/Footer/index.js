import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import CountryDropDown from '../CountryDropDown';
import * as types from '../../actions/actionTypes';
import { countries } from '../../constants';

const Footer = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { selectedCountry } = useSelector((state) => ({
    selectedCountry: state.storeReducer.country,
  }));

  return (
    <div fullWidth className={classes.root}>
      <div className={classes.TopSection}>
        <div className={`${classes.CopyRight} ${classes.ShowDesktop}`}>© Myda 2020.</div>
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
        <CountryDropDown
          value={selectedCountry}
          onChange={(country) => {
            dispatch({
              type: types.CHANGE_COUNTRY,
              payload: country,
            });
          }}
          countries={countries}
          wrapperClass={classes.CountryDropDown}
        />
        <div className={`${classes.CopyRight} ${classes.ShowMobile}`}>© Myda 2020.</div>
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
      marginTop: 'auto',
      '@media screen and (max-width: 767px)': {
        padding: '12px 12px 8px',
      },
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
      '@media screen and (max-width: 767px)': {
        width: '100%',
        justifyContent: 'space-around',
      },
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
      '@media screen and (max-width: 767px)': {
        fontSize: '12px',
        marginLeft: 0,
      },
    },
    BottomSection: {
      display: 'flex',
      marginTop: 'auto',
      '@media screen and (max-width: 767px)': {
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '32px',
      },
    },
    FooterLogo: {
      fontSize: '30px',
      fontWeight: 500,
      color: '#fff',
      textDecoration: 'none',
      '@media screen and (max-width: 767px)': {
        marginBottom: 0,
      },
    },
    CountryDropDown: {
      marginLeft: 'auto',
      '@media screen and (max-width: 767px)': {
        marginLeft: 'auto',
        marginRight: 'auto',
      },
    },
    ShowDesktop: {
      display: 'block',
      '@media screen and (max-width: 767px)': {
        display: 'none',
      },
    },
    ShowMobile: {
      display: 'none',
      '@media screen and (max-width: 767px)': {
        display: 'flex',
      },
    },
  })
);
export default Footer;
