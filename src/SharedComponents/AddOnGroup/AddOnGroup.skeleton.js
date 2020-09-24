import React from 'react';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';

const AddOnGroupSkeleton = () => {
  const classes = useStyles();

  return (
    <>
      <Skeleton style={{ width: '125px', height: '22px', transform: 'scale(1)' }} />
      <Grid container style={{ marginTop: '10px' }} spacing={3}>
        <Grid item className={classes.AddOnGridItem}>
          <Skeleton className={classes.AddOnItem} style={{ transform: 'scale(1)' }} />
        </Grid>
        <Grid item className={classes.AddOnGridItem}>
          <Skeleton className={classes.AddOnItem} style={{ transform: 'scale(1)' }} />
        </Grid>
        <Grid item className={classes.AddOnGridItem}>
          <Skeleton className={classes.AddOnItem} style={{ transform: 'scale(1)' }} />
        </Grid>
      </Grid>
    </>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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
  })
);
export default AddOnGroupSkeleton;
