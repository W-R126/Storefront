import React, { useState } from 'react';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Typography, IconButton } from '@material-ui/core';
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';

import DropDown from '../../../../../../SharedComponents/DropDown';

const OrderTypeSelector = ({ orderType, orderTypesList, onChange }) => {
  const classes = useStyles();

  const [editable, setEditable] = useState(false);

  const getOrderType = () => {
    const orderTypeList = [];
    const findDelivery = orderTypesList.find((item) => item.name.toLowerCase() === 'delivery');
    if (findDelivery) orderTypeList.push({ id: findDelivery.id, label: findDelivery.name });
    const findCollect = orderTypesList.find((item) => item.name.toLowerCase() === 'collection');
    if (findCollect) orderTypeList.push({ id: findCollect.id, label: findCollect.name });
    return orderTypeList;
  };

  return (
    <>
      <Typography variant="h4" className={classes.Title}>
        Order Type
        {editable ? (
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
      </Typography>

      {editable ? (
        <DropDown
          value={{ id: orderType.id, label: orderType.name }}
          menuList={getOrderType()}
          onChange={(selected) => {
            onChange({
              id: selected.id,
              name: selected.label,
            });
          }}
        />
      ) : (
        <Typography variant="h3">{orderType.name}</Typography>
      )}
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
export default OrderTypeSelector;
