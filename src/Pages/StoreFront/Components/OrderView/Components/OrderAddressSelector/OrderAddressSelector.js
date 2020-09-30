import React, { useState } from 'react';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Typography, IconButton } from '@material-ui/core';

import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import OrderAddressSelectModal from '../OrderAddressSelectModal';

const OrderAddressSelector = ({ addressInfo, onChange }) => {
  const classes = useStyles();
  const [editalbe, setEditable] = useState(false);

  const renderAddress = () => {
    // const keyAddress1 = ['line1', 'line2'];
    // const addressArr1 = [];
    // const keyAddress2 = ['city_town', 'postcode'];
    // const addressArr2 = [];
    // const address = addressInfo.address;

    // keyAddress1.forEach((item) => {
    //   if (address[item] && address[item].length > 0) {
    //     addressArr1.push(address[item]);
    //   }
    // });
    // keyAddress2.forEach((item) => {
    //   if (address[item] && address[item].length > 0) {
    //     addressArr2.push(address[item]);
    //   }
    // });

    const keyAddress1 = ['line1', 'line2', 'city_town', 'postcode'];
    const addressArr1 = [];
    const address = addressInfo.address;
    keyAddress1.forEach((item) => {
      if (address[item] && address[item].length > 0) {
        addressArr1.push(address[item]);
      }
    });

    return (
      <Typography variant="h3">
        <span style={{ fontWeight: 'normal' }}>
          {addressInfo.type}
          <br />
        </span>
        {addressArr1.join(', ')}
        {/* <br />
        {addressArr2.join(', ')} */}
      </Typography>
    );
  };
  return (
    <>
      <Typography variant="h4" className={classes.Title}>
        Deliver to
        {editalbe ? (
          <IconButton
            className={classes.EditButton}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setEditable(false);
            }}
          >
            <CloseOutlinedIcon className={classes.ControlIcon} />
          </IconButton>
        ) : (
          <IconButton
            className={classes.EditButton}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setEditable(true);
            }}
          >
            <CreateOutlinedIcon className={classes.ControlIcon} />
          </IconButton>
        )}
        {editalbe && (
          <OrderAddressSelectModal
            hideModal={() => {
              setEditable(false);
            }}
            propAddressInfo={addressInfo}
            onChange={onChange}
          />
        )}
      </Typography>
      {renderAddress()}
    </>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    Title: {
      display: 'flex',
      alignItems: 'center',
      lineHeight: '40px',
    },
    PenButton: {
      margin: '0 0 0 12px',
    },
    ControlIcon: {
      width: '18px',
      height: '18px',
      color: theme.palette.primary.title,
    },
  })
);

export default OrderAddressSelector;
