import React from 'react';

import _ from 'lodash';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Box, Typography, IconButton } from '@material-ui/core';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';

import PlaceHolderSvg from '../../assets/img/addon-item-placeholder.png';

const AddOnItem = ({ wrapperClass, itemData, selectedInfo, setSelectedAddOns }) => {
  const classes = useStyles();

  const getItemImage = () => {
    const itemImg = _.get(itemData, 'backImg', '');
    if (itemImg.length > 0) return itemImg;
    else return PlaceHolderSvg;
  };

  const getBackImgStyle = () => {
    const itemImg = _.get(itemData, 'backImg', '');
    if (itemImg.length > 0) return null;
    else return { backgroundColor: '#e1eaf1' };
  };

  const handleClickItem = () => {
    if (selectedInfo) return null;
    else {
      setSelectedAddOns({
        id: itemData.id,
        qty: 1,
      });
    }
  };

  const getCurrentQty = () => {
    return _.get(selectedInfo, 'qty', 0);
  };

  const renderCartControl = () => {
    if (selectedInfo) {
      return (
        <Box className={classes.ControlPanel}>
          <IconButton
            className={classes.AddItemButton}
            onClick={() => {
              setSelectedAddOns({
                ...selectedInfo,
                qty: selectedInfo.qty - 1,
              });
            }}
          >
            <RemoveIcon color="#fff" />
          </IconButton>
          <Typography variant="h2" className={classes.Count}>
            {getCurrentQty()}
          </Typography>
          <IconButton
            className={classes.AddItemButton}
            onClick={() => {
              setSelectedAddOns({
                ...selectedInfo,
                qty: selectedInfo.qty + 1,
              });
            }}
          >
            <AddIcon color="#fff" />
          </IconButton>
        </Box>
      );
    } else {
      return null;
    }
  };

  return (
    <Box className={classes.root} role="button" onClick={handleClickItem}>
      <Box className={classes.ImgBox} style={{ backgroundImage: `url(${getItemImage()})`, ...getBackImgStyle() }}></Box>
      {renderCartControl()}
      <Typography variant="h3" className={classes.ProductName}>
        {itemData.name}
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
