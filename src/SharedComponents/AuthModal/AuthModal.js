import React from 'react';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import CloseIconButton from '../CloseIconButton';

const AuthModal = ({ isShow, hideModal, children, wrapperClass }) => {
  const classes = useStyles();

  const rootClass = [classes.root];
  if (wrapperClass) rootClass.push(wrapperClass);

  const handleClick = () => {
    hideModal();
  };

  return (
    <Paper className={rootClass.join(' ')}>
      <CloseIconButton onClick={handleClick} wrapperClass={classes.CloseButtonWrapper} />
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
    CloseButtonWrapper: {
      top: '15px',
      right: '15px',
    },
  })
);

export default AuthModal;
