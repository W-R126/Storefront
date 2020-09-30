import React from 'react';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Dialog, DialogTitle, Box, Button, Typography } from '@material-ui/core';

const CleanCartConfirmDlg = ({ hideModal, confirm }) => {
  const classes = useStyles();

  return (
    <Dialog className={classes.root} onClose={hideModal} aria-labelledby="simple-dialog-title" open={true}>
      <Typography variant="h1" className={classes.Title}>
        Please confirm
      </Typography>
      <Box>
        <Button variant="contained" onClick={hideModal}>
          Cancel
        </Button>
        <Button variant="contained" onClick={confirm} color="primary" style={{ marginLeft: '40px' }}>
          Ok
        </Button>
      </Box>
    </Dialog>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& .MuiDialog-paper': {
        padding: '30px',
      },
    },
    Title: {
      textAlign: 'center',
      margin: '20px',
    },
  })
);

export default CleanCartConfirmDlg;
