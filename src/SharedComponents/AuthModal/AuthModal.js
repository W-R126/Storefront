import React from 'react';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const AuthModal = ({ isShow, hideModal, children }) => {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <IconButton onClick={hideModal} className={classes.CloseButton}>
        <CloseIcon />
      </IconButton>
      {children}
    </Paper>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'absolute',
      top: '80px',
      right: '24px',
      width: '100%',
      maxWidth: '383px',
      minHeight: '385px',
      boxShadow: '0 1px 4px 0 rgba(186, 195, 201, 0.5)',
      border: 'solid 1px rgba(186, 195, 201, 0.5)',
      backgroundColor: '#fff',
      padding: '25px',
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      '@media screen and (max-width: 767px)': {
        right: 'calc(50% - 191.5px)',
      },
    },
    CloseButton: {
      width: '40px',
      height: '40px',
      padding: 0,
      position: 'absolute',
      right: '15px',
      top: '15px',
      borderRadius: '20px',
      backgroundColor: theme.palette.secondary.greyBack,
      zIndex: 1,
    },
  })
);

export default AuthModal;
