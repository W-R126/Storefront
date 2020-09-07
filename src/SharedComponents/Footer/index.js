import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import CountryDropDown from '../CountryDropDown';
import * as types from '../../actions/actionTypes';
import { countries } from '../../constants';

import LogoWhiteSvg from '../../assets/img/logo-white.svg';

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
          <a className={classes.FooterLink} href="https://www.mydacloud.com/about">
            About Us
          </a>
          <a className={classes.FooterLink} href="https://www.mydacloud.com">
            Our Role
          </a>
          <a className={classes.FooterLink} href="https://www.mydacloud.com/howitworks">
            How it works
          </a>
          <a className={classes.FooterLink} href="https://www.mydacloud.com/yourdata">
            Your Data
          </a>
          <a className={classes.FooterLink} href="https://www.mydacloud.com/privacy">
            Privacy
          </a>
          <a className={classes.FooterLink} href="https://www.mydacloud.com/legal">
            Terms of Use
          </a>
        </div>
      </div>
      <div className={classes.BottomSection}>
        <Link className={classes.FooterLogo}>
          <img className={classes.Logo} src={LogoWhiteSvg} alt="Footer Logo" />
        </Link>
        <CountryDropDown
          value={selectedCountry}
          isPhoneNumber={false}
          onChange={(country) => {
            dispatch({
              type: types.CHANGE_COUNTRY,
              payload: country,
            });
          }}
          dropDownPosition={{
            right: 0,
            bottom: '100%',
          }}
          countries={countries}
          wrapperClass={classes.CountryDropDown}
          buttonStyles={{ fontSize: '12px' }}
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
        height: 'auto',
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
      '@media screen and (max-width: 639px)': {
        width: '100%',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
      },
    },
    FooterLink: {
      marginLeft: '40px',
      fontSize: '16px',
      fontWeight: 300,
      color: '#fff',
      textDecoration: 'none',
      whiteSpace: 'nowrap',
      '&:hover': {
        textDecoration: 'underline',
      },
      '@media screen and (max-width: 767px)': {
        fontSize: '12px',
        marginLeft: 0,
      },
      '@media screen and (max-width: 639px)': {
        flex: '1 1 33.33%',
        textAlign: 'center',
        marginBottom: '5px',
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
      '@media screen and (max-width: 639px)': {
        marginTop: '27px',
      },
    },
    FooterLogo: {
      fontSize: '30px',
      fontWeight: 500,
      color: '#fff',
      textDecoration: 'none',
      display: 'flex',
      alignItems: 'center',
      '@media screen and (max-width: 767px)': {
        marginBottom: 0,
      },
    },

    Logo: {
      width: '86px',
      height: 'auto',
      '@media screen and (max-width: 767px)': {
        width: '52px',
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
