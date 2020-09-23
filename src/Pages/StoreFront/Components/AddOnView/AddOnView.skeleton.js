import React from 'react';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Box, Grid } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';

const AddOnViewSkeleton = () => {
  const classes = useStyles();

  return (
    <Box container className={classes.root}>
      <Skeleton style={{ width: '155px', height: '27px' }} />
      <Skeleton style={{ width: '125px', height: '22px', marginTop: '30px' }} />
      <Grid container style={{ marginTop: '10px' }} spacing={3}>
        <Grid item className={classes.AddOnGridItem}>
          <Skeleton className={classes.AddOnItem} />
        </Grid>
        <Grid item className={classes.AddOnGridItem}>
          <Skeleton className={classes.AddOnItem} />
        </Grid>
        <Grid item className={classes.AddOnGridItem}>
          <Skeleton className={classes.AddOnItem} />
        </Grid>
      </Grid>
      <Box className={classes.Footer}>
        <Skeleton style={{ width: '150px', height: '50px' }} />
        <Skeleton style={{ width: '150px', height: '50px', marginLeft: '40px' }} />
      </Box>
    </Box>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      '& .MuiSkeleton-text': {
        transform: 'scale(1)',
      },
    },
    AddOnGridItem: {
      flexGrow: 0,
      maxWidth: '33.333333%',
      flexBasis: '33.333333%',
      '@media screen and (max-width: 1279px)': {
        maxWidth: '50%',
        flexBasis: '50%',
      },
      '@media screen and (max-width: 768px)': {
        maxWidth: '100%',
        flexBasis: '100%',
      },
    },
    AddOnItem: {
      width: '100%',
      height: '60px',
    },
    Footer: {
      display: 'flex',
      boxSizing: 'border-box',
      justifyContent: 'flex-end',
      alignItems: 'center',
      margin: '47px 0 0 0',
      '@media screen and (max-width: 480px)': {
        justifyContent: 'center',
      },
    },
  })
);

export default AddOnViewSkeleton;
