import React from 'react';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';

const MDIconButton = ({ children, onClick, wrapperClass }) => {
  const classes = useStyles();
  const rootClasses = [classes.root];
  if (wrapperClass) rootClasses.push(wrapperClass);
  return (
    <IconButton className={rootClasses.join(' ')} onClick={onClick}>
      {children}
    </IconButton>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      background: theme.palette.primary.greyBack,
      width: '40px',
      height: '40px',
      borderRadius: '4px',
      '@media screen and (max-width: 767px):': {
        width: '40px',
        height: '40px',
      },
    },
  })
);
export default MDIconButton;
