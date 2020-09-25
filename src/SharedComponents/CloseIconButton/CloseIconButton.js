import React from 'react';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const CloseIconButton = ({ onClick, wrapperClass }) => {
  const classes = useStyles();
  const rootClasses = [classes.root];
  if (wrapperClass) rootClasses.push(wrapperClass);
  return (
    <IconButton onClick={onClick} className={rootClasses.join(' ')}>
      <CloseIcon />
    </IconButton>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '40px',
      height: '40px',
      padding: 0,
      backgroundColor: 'rgba(186, 195, 201, 0.3)',
      position: 'absolute',
      borderRadius: '20px',
      zIndex: 1,
      '&: hover': {
        backgroundColor: 'rgba(186, 195, 201, 0.6)',
      },
      '& .MuiSvgIcon-root': {
        color: theme.palette.primary.title,
      },
    },
  })
);

export default CloseIconButton;
