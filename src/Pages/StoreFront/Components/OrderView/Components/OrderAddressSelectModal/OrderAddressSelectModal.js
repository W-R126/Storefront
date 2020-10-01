import React, { useEffect, useState } from 'react';

import _ from 'lodash';
import { useQuery } from '@apollo/react-hooks';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Paper, Box, Typography, Select, MenuItem, Button, Radio, FormControlLabel } from '@material-ui/core';
import CloseIconButton from '../../../../../../SharedComponents/CloseIconButton';
import { GET_DELIVERY_ADDRESS } from '../../../../../../graphql/auth/auth-query';

const OrderAddressSelectModal = ({ hideModal, propAddressInfo, onChange }) => {
  const classes = useStyles();

  const [addressInfo, setAddressInfo] = useState({ ...propAddressInfo });

  useEffect(() => {
    setAddressInfo({ ...propAddressInfo });
  }, [propAddressInfo]);

  const { loading: addressLoading, data: addressList } = useQuery(GET_DELIVERY_ADDRESS);

  const getAddressList = () => {
    if (!addressList) return [];
    return addressList.currentUser.addresses;
  };

  const renderAddress = (addressItem) => {
    const addressArr = [];
    const keyAddress = ['line1', 'line2', 'city_town', 'postcode'];
    keyAddress.forEach((item) => {
      if (addressItem[item] && addressItem[item].length > 0) {
        addressArr.push(addressItem[item]);
      }
    });
    return addressArr.join(', ');
  };

  const getSelectedAddress = (e) => {
    if (!addressList) return {};
    const addresses = addressList.currentUser.addresses;
    return addresses.find((item) => item.id === e.target.value);
  };

  const getAddressBoxClasses = (radioValue) => {
    if (addressInfo.type === radioValue) return [classes.StaticAddressBox, classes.ActiveBox].join(' ');
    return classes.StaticAddressBox;
  };

  const renderHomeAddress = () => {
    const addresses = getAddressList();
    const findOne = addresses.find((item) => item.name && item.name.toLowerCase() === 'home');
    if (findOne)
      return (
        <Box className={getAddressBoxClasses('Home')}>
          <FormControlLabel
            value="Home"
            control={
              <Radio
                className={classes.AddressRadio}
                checked={addressInfo.type === 'Home'}
                onChange={() =>
                  setAddressInfo({
                    type: 'Home',
                    address: findOne,
                  })
                }
              />
            }
            label="Home"
          />
          <Typography variant="h3" className={classes.StaticAddress}>
            Test Home Address
          </Typography>
        </Box>
      );
    return null;
  };

  const renderOfficeAddress = () => {
    const addresses = getAddressList();
    const findOne = addresses.find((item) => item.name && item.name.toLowerCase() === 'office');
    if (findOne)
      return (
        <Box className={getAddressBoxClasses('Office')}>
          <FormControlLabel
            value="Office"
            control={
              <Radio
                className={classes.AddressRadio}
                checked={addressInfo.type === 'Office'}
                onChange={() =>
                  setAddressInfo({
                    type: 'Office',
                    address: addressInfo.address,
                  })
                }
              />
            }
            label="Office"
          />
          <Typography variant="h3" className={classes.StaticAddress}>
            Test Office Address
          </Typography>
        </Box>
      );
    return null;
  };

  return (
    <Paper className={classes.root}>
      <CloseIconButton onClick={hideModal} wrapperClass={classes.CloseIconWrapper} />
      <Typography className={classes.Title} variant="h2">
        Enter your delivery Address
      </Typography>
      {renderHomeAddress()}
      {renderOfficeAddress()}

      <Box className={getAddressBoxClasses('New Address')}>
        <FormControlLabel
          value="Office"
          control={
            <Radio
              className={classes.AddressRadio}
              checked={addressInfo.type === 'New Address'}
              onChange={() =>
                setAddressInfo({
                  type: 'New Address',
                  address: addressInfo.address,
                })
              }
            />
          }
          label="New Address"
        />
        <Select
          className={classes.AddressSelect}
          MenuProps={{
            getContentAnchorEl: null,
            anchorOrigin: {
              vertical: 'bottom',
              horizontal: 'left',
            },
          }}
          value={_.get(addressInfo.address, 'id', '')}
          onChange={(value) => {
            setAddressInfo({
              type: 'New Address',
              address: getSelectedAddress(value),
            });
          }}
        >
          {getAddressList().map((item) => {
            if (renderAddress(item).length === 0) return null;
            return (
              <MenuItem className={classes.AddressMenuItem} value={item.id}>
                {renderAddress(item)}
              </MenuItem>
            );
          })}
        </Select>
      </Box>
      <Box className={classes.Footer}>
        <Button className={classes.CancelButton} variant="contained" onClick={hideModal}>
          Cancel
        </Button>
        <Button
          className={classes.ConfirmButton}
          variant="contained"
          color="primary"
          onClick={() => {
            onChange(addressInfo);
            hideModal();
          }}
        >
          Ok
        </Button>
      </Box>
    </Paper>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '561px',
      height: '398px',
      borderRadius: '10px',
      boxShadow: '0 1px 4px 0 rgba(186, 195, 201, 0.5)',
      border: 'solid 1px rgba(186, 195, 201, 0.5)',
      backgroundColor: '#ffffff',
      position: 'absolute',
      padding: '25px 35px 35px',
      display: 'flex',
      flexDirection: 'column',
      left: '50%',
      top: '50%',
      transform: 'translate(-50%, -50%)',
      zIndex: 1,
    },
    CloseIconWrapper: {
      right: '15px',
      top: '15px',
    },
    Title: {
      fontWeight: 'normal',
      color: theme.palette.primary.text,
    },
    StaticAddressBox: {
      display: 'flex',
      flexDirection: 'column',
      margin: '12px 0 0 0',
      '& .MuiFormControlLabel-label': {
        fontSize: '12px',
        fontWeight: 300,
        color: theme.palette.primary.text,
      },
    },
    AddressRadio: {
      '&.Mui-checked': {
        color: theme.palette.primary.yellow,
      },
    },
    ActiveBox: {
      '& .MuiFormControlLabel-label': {
        color: theme.palette.primary.main,
      },
    },
    StaticAddress: {
      margin: '0 32px',
      color: theme.palette.primary.text,
    },
    AddressSelect: {
      margin: '-10px 32px 0',
      '&.MuiInput-root': {
        height: '50px',
      },
      '& .MuiSelect-selectMenu': {
        height: '37px',
        display: 'flex',
        alignItems: 'center',
        paddingLeft: '15px',
      },
    },
    AddressMenuItem: {
      '&.MuiMenuItem-root': {
        height: '69px',
        padding: '15px',
        display: 'flex',
        alignItems: 'center',
      },
    },
    Footer: {
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: 'auto',
    },
    CancelButton: {
      width: '200px',
      height: '50px',
    },
    ConfirmButton: {
      width: '200px',
      height: '50px',
    },
  })
);
export default OrderAddressSelectModal;
