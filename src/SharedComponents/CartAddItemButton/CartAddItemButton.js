import React from 'react';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { IconButton } from '@material-ui/core';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';

const CartAddItemButton = ({ wrapperClass, buttonClass, onClick, disabled, type }) => {
  const classes = useStyles();

  const rootClasses = [classes.root];
  if (wrapperClass) rootClasses.push(wrapperClass);

  return (
    <IconButton className={rootClasses.join(' ')} onClick={onClick} disabled={disabled}>
      {type.toLowerCase() === 'minus' && <RemoveIcon />}
      {type.toLowerCase() === 'plus' && <AddIcon />}
    </IconButton>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      boxSizing: 'border-box',
      padding: 0,
      width: '20px',
      height: '20px',
      borderRadius: '50%',
      backgroundColor: 'rgba(32, 39, 47, 0.86)',
      '&.Mui-disabled': {
        backgroundColor: 'rgba(32, 39, 47, 0.86)',
        opacity: 0.5,
      },
      '&:hover': {
        backgroundColor: 'rgba(32, 39, 47, 0.66)',
      },
      '& .MuiSvgIcon-root': {
        width: '20px',
        height: '20px',
        fontSize: '20px',
        color: 'white',
      },
    },
  })
);

export default CartAddItemButton;
