import React from 'react';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Box, Typography, IconButton } from '@material-ui/core';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';

const AddOnItem = ({ wrapperClass }) => {
  const classes = useStyles();

  return (
    <Box className={classes.root} role="button">
      <Box className={classes.ImgBox} style={{ backgroundImage: `url()` }}></Box>
      <Box className={classes.ControlPanel}>
        <IconButton className={classes.AddItemButton}>
          <RemoveIcon color="#fff" />
        </IconButton>
        <Typography variant="h2" className={classes.Count}>
          1
        </Typography>
        <IconButton className={classes.AddItemButton}>
          <AddIcon color="#fff" />
        </IconButton>
      </Box>
      <Typography variant="h3" className={classes.ProductName}>
        Product Name
      </Typography>
      <Typography variant="h3" className={classes.Price}>
        £0.50
      </Typography>
    </Box>
  );
};
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      boxSizing: 'border-box',
      display: 'flex',
      alignItems: 'center',
      height: '60px',
      border: 'solid 1px rgba(186, 195, 201, 0.5)',
      position: 'relative',
      cursor: 'pointer',
      '&:hover': {
        backgroundColor: 'rgba(186, 195, 201, 0.2)',
      },
    },
    ImgBox: {
      boxSizing: 'border-box',
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center center',
      width: '69px',
      margin: '0 17px 0 0',
      height: '100%',
    },
    ControlPanel: {
      boxSizing: 'border-box',
      display: 'flex',
      margin: '0 9px 0 0',
    },
    AddItemButton: {
      boxSizing: 'border-box',
      padding: '1px',
      width: '20px',
      height: '20px',
      borderRadius: '9px',
      backgroundColor: 'rgba(32, 39, 47, 0.86)',
      '&:hover': {
        backgroundColor: 'rgba(32, 39, 47, 0.66)',
      },
      '& .MuiSvgIcon-root': {
        width: '18px',
        height: '18px',
        color: 'white',
      },
    },
    Count: {
      fontSize: '20px',
      color: '#55cc66',
      fontWeight: 'normal',
      minWidth: '30px',
      textAlign: 'center',
    },
    ProductName: {
      margin: '0 0 0 7px',
    },
    Price: {
      margin: '0 13px 0 auto',
    },
  })
);

export default AddOnItem;
