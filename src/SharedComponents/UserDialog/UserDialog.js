import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Avatar from '@material-ui/core/Avatar';
import { Button } from '@material-ui/core';
import EditableLabel from '../EditableLabel';
import { getUserAvatar, getUserName, getUserEmail } from '../../utils/auth';

const UserDialog = ({ hideModal }) => {
  const classes = useStyles();
  const { authInfo } = useSelector((state) => ({
    authInfo: state.authReducer.userInfo,
  }));

  return (
    <Paper className={classes.root}>
      <IconButton onClick={hideModal} className={classes.CloseButton}>
        <CloseIcon />
      </IconButton>
      <Avatar src={getUserAvatar(authInfo)} className={classes.UserAvatar} />
      <EditableLabel
        value={getUserName(authInfo)}
        onChange={(value) => {
          console.log('change User Name');
        }}
        label="User Name"
        wrapperClass={classes.UserName}
      />
      <EditableLabel
        value={getUserEmail(authInfo)}
        onChange={(value) => {
          console.log('Change User Email');
        }}
        label="User Email"
        wrapperClass={classes.UserName}
      />
      <Button className={classes.ChangePassword}>Change Password</Button>
      <Button className={classes.Logout}>Logout</Button>
    </Paper>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'absolute',
      top: '80px',
      right: '0',
      width: '383px',
      boxShadow: '0 1px 4px 0 rgba(186, 195, 201, 0.5)',
      border: 'solid 1px rgba(186, 195, 201, 0.5)',
      backgroundColor: '#fff',
      padding: '15px',
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
    },
    CloseButton: {
      width: '30px',
      height: '30px',
      padding: 0,
      marginLeft: 'auto',
    },
    UserAvatar: {
      width: '96px',
      height: '96px',
      margin: '3px auto 0',
    },
    UserName: {
      margin: '9px 0 0 0',
    },
    ChangePassword: {
      fontSize: '20px',
      fontWeight: 300,
      color: theme.palette.primary.title,
      lineHeight: '24px',
      marginTop: '30px',
      '& .MuiButton-label': {
        justifyContent: 'flex-start',
      },
    },
    Logout: {
      fontSize: '20px',
      fontWeight: 300,
      color: theme.palette.primary.title,
      lineHeight: '24px',
      margin: '15px 0 15px',
      '& .MuiButton-label': {
        justifyContent: 'flex-start',
      },
    },
  })
);

export default UserDialog;
