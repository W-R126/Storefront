import React from 'react';

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

const ProductCard = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.ProductImg}></div>
      <div className={classes.ProductContent}>
        <div className={classes.TopSection}>
          <div className={classes.LeftInfo}>
            <div className={classes.Title}>Chivas Regal</div>
            <div className={classes.Status}>Code: 43894</div>
          </div>
          <div className={classes.Value}>
            <div className={classes.Price}>$180.00</div>
            <div className={classes.Stock}>10 in stock</div>
          </div>
        </div>
        <div className={classes.Description}>
          Lorem ipsum dolor sit amet, ut sonet disputando vim, ea solum principes pro. Pri ex possim suavitate
        </div>
        <div className={classes.Bottom}>
          {/* <div className={classes.AddCart}>Add to cart</div> */}
          <div className={classes.ProductCount}>
            <div className={classes.CircleButton} role="button">
              <RemoveIcon />
            </div>
            <div className={classes.CountValue}>20</div>
            <div className={classes.CircleButton} role="button">
              <AddIcon />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      padding: '5px',
      boxSizing: 'border-box',
      height: '129px',
      boxShadow: '0 1px 6px 0 rgba(0, 0, 0, 0.05)',
      border: 'solid 0.5px rgba(186, 195, 201, 0.5)',
    },
    ProductImg: {
      backgroundPosition: 'center center',
      backgroundSize: 'contain',
      flex: '0 0 90px',
    },
    ProductContent: {
      flex: '1 1 100%',
      display: 'flex',
      flexDirection: 'column',
      paddingLeft: '10px',
      paddingRight: '17px',
      paddingBottom: '12px',
    },
    TopSection: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    LeftInfo: {
      display: 'flex',
      flexDirection: 'column',
    },
    Title: {
      fontWeight: 500,
      lineHeight: '20px',
      marginBottom: '4px',
      fontSize: '14px',
    },
    Status: {
      fontSize: '12px',
      lineHeight: '18px',
    },
    Value: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'flex-end',
      marginLeft: '15px',
      lineHeight: '18px',
      fontSize: '12px',
    },
    Price: {
      fontWeight: 500,
      lineHeight: '18px',
      fontSize: '12px',
    },
    Description: {
      fontSize: '12px',
      fontWeight: 300,
      lineHeight: '18px',
      margin: '5px 0 0 0',
    },
    Bottom: {
      display: 'flex',
      marginTop: 'auto',
    },
    AddCart: {
      margin: '3px 0 0 auto',
      color: '#1174f2',
      fontSize: '12px',
      cursor: 'pointer',
      lineHeight: 'normal',
    },
    ProductCount: {
      marginLeft: 'auto',
      display: 'flex',
      alignItems: 'center',
      '& .MuiSvgIcon-root': {
        width: '15px',
      },
    },
    CircleButton: {
      display: 'flex',
      width: '18px',
      height: '18px',
      cursor: 'pointer',
      borderRadius: '10px',
      backgroundColor: '#41474e',
      justifyContent: 'center',
      alignItems: 'center',
      color: '#fff',
    },
    CountValue: {
      fontSize: '20px',
      margin: '0 11px',
    },
  })
);

export default ProductCard;
