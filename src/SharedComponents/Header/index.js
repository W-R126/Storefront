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

import SearchInput from '../SearchInput';
import MDIconButton from '../../SharedComponents/MDIconButton';
import DropDown from '../DropDown';
import LoginSignUpDlg from '../LoginSignUpDlg';
import UserDialog from '../UserDialog';
import { getUserAvatar } from '../../utils/auth';
import * as types from '../../actions/actionTypes';
import { GET_CATEGORIES } from '../../graphql/categories/categories-query';
import { GET_STORE_SETTING_PRODUCT } from '../../graphql/store/store-query';
import { getOrderedCategories } from '../../utils/category';

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
        <MDIconButton aria-label="open drawer">
          <MenuIcon color="Secondary.dark" />
        </MDIconButton>
        <Link to="/" className={classes.LogoBrand}>
          myda
        </Link>
        <MDIconButton aria-label="header back" wrapperClass={classes.BackButton}>
          <KeyboardBackspaceIcon color="Secondary.dark" />
        </MDIconButton>
        <SearchInput categoryMenuList={getCategoryMenuItems()} />
        <DropDown
          value={{ id: orderType.id, label: orderType.name }}
          menuList={orderTypesList.map((item) => {
            return { id: item.id, label: item.name };
          })}
          wrapperStyles={{ marginLeft: 'auto', width: '147px', background: '#fff', borderRadius: '2px' }}
          buttonStyles={{ background: '#fff' }}
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
            <button className={classes.SignUpButton}>Signup</button>
            <button className={classes.LoginButton} onClick={() => setShowLogin(true)}>
              Login
            </button>
          </>
        )}
      </Toolbar>
      {showLogin && <LoginSignUpDlg hideLogin={() => setShowLogin(false)} />}
      {showUserDetail && <UserDialog hideModal={() => setShowUserDetail(false)} />}
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
    },
    LogoBrand: {
      color: '#0156b8',
      fontSize: '36px',
      textDecoration: 'none',
      fontWeight: 600,
      marginLeft: '18px',
    },
    BackButton: {
      marginLeft: '34px',
    },
    CartButton: {
      marginLeft: '52px',
    },
    NotiButton: {
      marginLeft: '40px',
    },
    SignUpButton: {
      color: '#0156b8',
      fontSize: '20px',
      background: 'transparent',
      border: 'none',
      outline: 'none',
      cursor: 'pointer',
      marginLeft: '42px',
    },
    LoginButton: {
      color: '#0156b8',
      fontSize: '20px',
      background: 'transparent',
      border: 'none',
      outline: 'none',
      cursor: 'pointer',
      marginLeft: '42px',
    },
    UserAvatar: {
      cursor: 'pointer',
      width: '40px',
      height: '40px',
      marginLeft: '43px',
    },
  })
);

export default Header;
