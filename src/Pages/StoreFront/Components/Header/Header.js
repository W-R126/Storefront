import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import _ from 'lodash';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { AppBar, Toolbar, Avatar, Typography, Box } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import NotificationsNoneOutlinedIcon from '@material-ui/icons/NotificationsNoneOutlined';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import SearchInput from '../../../../SharedComponents/SearchInput';
import MDIconButton from '../../../../SharedComponents/MDIconButton';
import DropDown from '../../../../SharedComponents/DropDown';
import LoginModal from '../../../../SharedComponents/LoginModal';
import UserDialog from '../../../../SharedComponents/UserDialog';
import SignUpModal from '../../../../SharedComponents/SignUpModal';
import ResetPassword from '../../../../SharedComponents/ResetPasswordModal';
import CartButton from './Components/CartButton';

import { UPDATE_TRANS_TYPE, SET_CUR_MODAL } from '../../../../actions/actionTypes';
import { getUserAvatar, getUserName, getMerchantName, checkUserMerchantRole } from '../../../../utils/auth';
import { getOrderTypes } from '../../../../utils/store';
import { MODAL_STATUS } from '../../../../constants';

import LogoSvg from '../../../../assets/img/logo.svg';

const Header = ({ children }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [orderTypesList, setOrderTypesList] = useState([]);
  const { authInfo, orderType, storeInfo, curModal } = useSelector((state) => ({
    authInfo: state.authReducer.userInfo,
    orderType: state.storeReducer.orderType,
    storeInfo: state.storeReducer.storeInfo,
    curModal: state.modalStatusReducer.curModal,
  }));

  useEffect(() => {
    setOrderTypesList([...getOrderTypes(storeInfo)]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storeInfo]);

  useEffect(() => {
    if (orderTypesList.length > 0)
      dispatch({
        type: UPDATE_TRANS_TYPE,
        payload: orderTypesList[0],
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderTypesList]);

  const checkIsLogin = () => {
    const uesrID = _.get(authInfo, 'id', null);
    if (uesrID === null) return false;
    return true;
  };

  const renderUserInfo = () => {
    if (!checkUserMerchantRole(authInfo)) return null;
    const merchantName = getMerchantName(authInfo);
    const userName = getUserName(authInfo);
    return (
      <Box className={classes.UserInfo}>
        <Typography variant="h3" className="UserName">
          {userName}
        </Typography>
        <Typography variant="h4">{merchantName}</Typography>
      </Box>
    );
  };

  return (
    <AppBar className={classes.Root}>
      <Toolbar>
        <MDIconButton aria-label="open drawer" wrapperClass={classes.MenuIconButton}>
          <MenuIcon />
        </MDIconButton>
        <Link to="/" className={classes.LogoBrand}>
          <img className={classes.Logo} src={LogoSvg} alt="header logo" />
        </Link>
        <MDIconButton aria-label="header back" wrapperClass={classes.BackButton}>
          <KeyboardBackspaceIcon />
        </MDIconButton>
        <SearchInput />
        <DropDown
          value={{ id: orderType.id, label: orderType.name }}
          menuList={orderTypesList.map((item) => {
            return { id: item.id, label: item.name, pricing_type: item.pricing_type };
          })}
          wrapperClass={classes.OrderTypeDropDown}
          onChange={(selected) => {
            dispatch({
              type: UPDATE_TRANS_TYPE,
              payload: { id: selected.id, name: selected.label, pricing_type: selected.pricing_type },
            });
          }}
          buttonClass={classes.DropDownButtonClass}
        />
        <CartButton wrapperClass={classes.CartButton} orderTypesList={orderTypesList} />
        {checkIsLogin() ? (
          <>
            <MDIconButton wrapperClass={classes.NotiButton}>
              <NotificationsNoneOutlinedIcon />
            </MDIconButton>
            <Avatar
              className={classes.UserAvatar}
              src={getUserAvatar(authInfo)}
              role="button"
              onClick={() =>
                dispatch({
                  type: SET_CUR_MODAL,
                  payload: MODAL_STATUS.USERDETAIL,
                })
              }
            />
            {renderUserInfo()}
          </>
        ) : (
          <>
            <button
              className={classes.SignUpButton}
              onClick={() => {
                // setShowSignUp(true);
                // setShowLogin(false);
                dispatch({
                  type: SET_CUR_MODAL,
                  payload: MODAL_STATUS.SIGNUP,
                });
              }}
            >
              Signup
            </button>
            <button
              className={classes.LoginButton}
              onClick={() => {
                dispatch({
                  type: SET_CUR_MODAL,
                  payload: MODAL_STATUS.LOGIN,
                });
                // setShowLogin(true);
                // setShowSignUp(false);
              }}
            >
              Login
            </button>
            <MDIconButton
              wrapperClass={classes.IconLoginButton}
              onClick={() => {
                // setShowLogin(true);
                dispatch({
                  type: SET_CUR_MODAL,
                  payload: MODAL_STATUS.LOGIN,
                });
              }}
            >
              <ExitToAppIcon />
            </MDIconButton>
          </>
        )}
      </Toolbar>
      {curModal === MODAL_STATUS.LOGIN && (
        <LoginModal
          isShow={curModal === MODAL_STATUS.LOGIN}
          hideModal={() => {
            // setShowLogin(false);
            dispatch({
              type: SET_CUR_MODAL,
              payload: MODAL_STATUS.NONE,
            });
          }}
          gotoSignUp={() => {
            // setShowLogin(false);
            // setShowSignUp(true);
            dispatch({
              type: SET_CUR_MODAL,
              payload: MODAL_STATUS.SIGNUP,
            });
          }}
          gotoForgotPassword={() => {
            // setShowLogin(false);
            // setShowResetPassword(true);
            dispatch({
              type: SET_CUR_MODAL,
              payload: MODAL_STATUS.PASSWORD_RESET,
            });
          }}
        />
      )}
      {curModal === MODAL_STATUS.USERDETAIL && (
        <UserDialog
          hideModal={() => {
            // setShowUserDetail(false)
            dispatch({
              type: SET_CUR_MODAL,
              payload: MODAL_STATUS.NONE,
            });
          }}
        />
      )}
      {curModal === MODAL_STATUS.SIGNUP && (
        <SignUpModal
          hideModal={() =>
            dispatch({
              type: SET_CUR_MODAL,
              payload: MODAL_STATUS.NONE,
            })
          }
          gotoLogin={() => {
            // setShowSignUp(false);
            // setShowLogin(true);
            dispatch({
              type: SET_CUR_MODAL,
              payload: MODAL_STATUS.LOGIN,
            });
          }}
        />
      )}
      {curModal === MODAL_STATUS.PASSWORD_RESET && (
        <ResetPassword
          hideModal={() => {
            // setShowResetPassword(false);
            dispatch({
              type: SET_CUR_MODAL,
              payload: MODAL_STATUS.NONE,
            });
          }}
          gotoLogin={() => {
            // setShowResetPassword(false);
            // setShowLogin(true);
            dispatch({
              type: SET_CUR_MODAL,
              payload: MODAL_STATUS.LOGIN,
            });
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
        color: theme.palette.primary.title,
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
      '& .MuiSvgIcon-root': {
        color: theme.palette.primary.title,
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
      marginLeft: '45px',
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
    DropDownButtonClass: {
      '@media screen and (max-width: 480px)': {
        width: '100%',
      },
    },
    UserInfo: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      marginLeft: '5px',
      boxSizing: 'border-box',
      '& .UserName': {
        color: theme.palette.primary.text,
      },

      '@media screen and (max-width: 639px)': {
        display: 'none',
      },
    },
  })
);

export default Header;
