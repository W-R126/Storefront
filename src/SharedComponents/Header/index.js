import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';
import { useQuery } from '@apollo/react-hooks';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { AppBar, Toolbar, Avatar } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import SearchInput from '../SearchInput';
import MDIconButton from '../../SharedComponents/MDIconButton';
import DropDown from '../DropDown';
import LoginModal from '../LoginModal';
import UserDialog from '../UserDialog';
import SignUpModal from '../SignUpModal';
import * as types from '../../actions/actionTypes';
import { GET_CATEGORIES } from '../../graphql/categories/categories-query';
import { GET_STORE_SETTING_PRODUCT } from '../../graphql/store/store-query';
import { getUserAvatar } from '../../utils/auth';
import { getOrderedCategories } from '../../utils/category';

import LogoSvg from '../../assets/img/logo.svg';

const Header = ({ children, orderTypesList }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    if (orderTypesList.length > 0)
      dispatch({
        type: types.UPDATE_TRANS_TYPE,
        payload: orderTypesList[0],
      });
  }, [dispatch, orderTypesList]);

  const { data, loading, error } = useQuery(GET_CATEGORIES);
  const { loading: storeSettingLoading, error: storeSettingError, data: storeSettingData } = useQuery(
    GET_STORE_SETTING_PRODUCT
  );

  const [showLogin, setShowLogin] = useState(false);
  const [showUserDetail, setShowUserDetail] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);

  const { authInfo, orderType } = useSelector((state) => ({
    authInfo: state.authReducer.userInfo,
    orderType: state.storeReducer.orderType,
  }));

  const checkIsLogin = () => {
    const uesrID = _.get(authInfo, 'id', null);
    if (uesrID === null) return false;
    return true;
  };

  const getCategoryMenuItems = () => {
    const categories = getOrderedCategories(data, storeSettingData);
    return [
      { id: '-1', label: 'All' },
      ...categories.map((item) => {
        return { id: item.id, label: item.name };
      }),
    ];
  };

  return (
    <AppBar className={classes.Root}>
      <Toolbar>
        <MDIconButton aria-label="open drawer" wrapperClass={classes.MenuIconButton}>
          <MenuIcon color="Primary.text1" />
        </MDIconButton>
        <Link to="/" className={classes.LogoBrand}>
          <img className={classes.Logo} src={LogoSvg} alt="header logo" />
        </Link>
        <MDIconButton aria-label="header back" wrapperClass={classes.BackButton}>
          <KeyboardBackspaceIcon color="Primary.text1" />
        </MDIconButton>
        <SearchInput />
        <DropDown
          value={{ id: orderType.id, label: orderType.name }}
          menuList={orderTypesList.map((item) => {
            return { id: item.id, label: item.name };
          })}
          wrapperClass={classes.OrderTypeDropDown}
          onChange={(selected) => {
            dispatch({
              type: types.UPDATE_TRANS_TYPE,
              payload: { id: selected.id, name: selected.label },
            });
          }}
        />
        <MDIconButton wrapperClass={classes.CartButton} aria-label="shopping-cart">
          <ShoppingCartIcon />
        </MDIconButton>
        {checkIsLogin() ? (
          <>
            <MDIconButton wrapperClass={classes.NotiButton}>
              <NotificationsNoneIcon />
            </MDIconButton>
            <Avatar
              className={classes.UserAvatar}
              src={getUserAvatar(authInfo)}
              role="button"
              onClick={() => setShowUserDetail(true)}
            />
          </>
        ) : (
          <>
            <button
              className={classes.SignUpButton}
              onClick={() => {
                setShowSignUp(true);
                setShowLogin(false);
              }}
            >
              Signup
            </button>
            <button
              className={classes.LoginButton}
              onClick={() => {
                setShowLogin(true);
                setShowSignUp(false);
              }}
            >
              Login
            </button>
            <MDIconButton
              wrapperClass={classes.IconLoginButton}
              onClick={() => {
                setShowLogin(true);
              }}
            >
              <ExitToAppIcon />
            </MDIconButton>
          </>
        )}
      </Toolbar>
      {showLogin && (
        <LoginModal
          isShow={showLogin}
          hideModal={() => {
            setShowLogin(false);
          }}
          gotoSignUp={() => {
            setShowLogin(false);
            setShowSignUp(true);
          }}
        />
      )}
      {showUserDetail && <UserDialog hideModal={() => setShowUserDetail(false)} />}
      {showSignUp && (
        <SignUpModal
          hideModal={() => setShowSignUp(false)}
          gotoLogin={() => {
            setShowSignUp(false);
            setShowLogin(true);
          }}
        />
      )}
    </AppBar>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    Root: {
      background: '#fff',
      '& .MuiToolbar-root': {
        height: '80px',
      },

      '@media screen and (max-width: 767px)': {
        '& .MuiToolbar-root': {
          height: '70px',
          '& .MuiToolbar-gutters': {
            paddingLeft: '10px',
            paddingRight: '10px',
          },
        },
      },
    },
    MenuIconButton: {
      background: 'transparent',
      padding: 0,
      '& .MuiSvgIcon-root': {
        width: '30px',
        height: '30px',
      },
    },
    LogoBrand: {
      color: '#0156b8',
      fontSize: '36px',
      textDecoration: 'none',
      fontWeight: 600,
      marginLeft: '18px',
      display: 'flex',
      alignItems: 'center',
      '@media screen and (max-width: 767px)': {
        display: 'none',
      },
    },
    Logo: {
      width: '86px',
      height: 'auto',
    },
    BackButton: {
      marginLeft: '34px',
      '@media screen and (max-width: 767px)': {
        marginLeft: '13px',
      },
    },
    OrderTypeDropDown: {
      marginLeft: 'auto',
      width: '147px',
      background: '#fff',
      borderRadius: '2px',
      '@media screen and (max-width: 479px)': {
        width: '125px',
      },
    },
    CartButton: {
      marginLeft: '52px',
      '@media screen and (max-width: 767px)': {
        marginLeft: '10px',
      },
    },
    NotiButton: {
      marginLeft: '40px',
      '@media screen and (max-width: 767px)': {
        marginLeft: '10px',
      },
    },
    SignUpButton: {
      color: '#0156b8',
      fontSize: '20px',
      background: 'transparent',
      border: 'none',
      outline: 'none',
      cursor: 'pointer',
      marginLeft: '42px',
      '@media screen and (max-width: 767px)': {
        display: 'none',
      },
    },
    LoginButton: {
      color: '#0156b8',
      fontSize: '20px',
      background: 'transparent',
      border: 'none',
      outline: 'none',
      cursor: 'pointer',
      marginLeft: '42px',
      padding: 0,
      '@media screen and (max-width: 767px)': {
        display: 'none',
      },
    },
    IconLoginButton: {
      display: 'none',
      marginLeft: '10px',
      '@media screen and (max-width: 767px)': {
        display: 'flex',
      },
    },
    UserAvatar: {
      cursor: 'pointer',
      width: '40px',
      height: '40px',
      marginLeft: '43px',
      '@media screen and (max-width: 767px)': {
        marginLeft: '14px',
      },
    },
  })
);

export default Header;
