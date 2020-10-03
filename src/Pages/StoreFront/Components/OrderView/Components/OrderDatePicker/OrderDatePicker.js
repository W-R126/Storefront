import React, { useState } from 'react';

import 'date-fns';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Typography, IconButton, Select, Radio, FormControlLabel, MenuItem } from '@material-ui/core';

import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';

export const OrderDatePicker = ({ title, dateInfo, onChange }) => {
  const classes = useStyles();
  const [editalbe, setEditable] = useState(false);

  const renderHourMenus = () => {
    const hourArr = [];
    for (let i = 6; i < 21; i++) {
      hourArr.push(
        <MenuItem className={classes.HoursMenu} value={i} key={i}>
          {`${i}:00 - ${i + 1}:00`}
        </MenuItem>
      );
    }
    return hourArr;
  };

  return (
    <>
      <Typography variant="h4" className={classes.Title}>
        {title}
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
      </Typography>
      {editalbe ? (
        <>
          <FormControlLabel
            label="Now"
            className={classes.WhenField}
            control={
              <Radio
                className={classes.TimeRadio}
                checked={dateInfo.when === 'Now'}
                onChange={() => {
                  onChange({
                    ...dateInfo,
                    when: 'Now',
                  });
                }}
              />
            }
          />
          <FormControlLabel
            label="For Later"
            className={classes.WhenField}
            control={
              <Radio
                className={classes.TimeRadio}
                checked={dateInfo.when === 'For Later'}
                onChange={() => {
                  onChange({
                    ...dateInfo,
                    when: 'For Later',
                  });
                }}
              />
            }
          />
          <Select
            className={classes.TimeSelector}
            MenuProps={{
              getContentAnchorEl: null,
              anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'left',
              },
            }}
            value={dateInfo.value}
            onChange={(e) => {
              onChange({
                ...dateInfo,
                value: e.target.value,
              });
            }}
            disabled={dateInfo.when === 'Now'}
          >
            {renderHourMenus()}
          </Select>
        </>
      ) : (
        <>
          <Typography variant="h3">
            <span style={{ fontWeight: 'normal' }}>{dateInfo.when}</span>
          </Typography>
          {dateInfo.when === 'For Later'}
          <Typography variant="h3">{`${dateInfo.value}:00 - ${dateInfo.value + 1}:00`}</Typography>
        </>
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
    WhenField: {
      width: '100%',
    },
    TimeRadio: {
      '&.Mui-checked': {
        color: theme.palette.primary.yellow,
      },
    },
    TimeSelector: {
      width: '100%',
      height: '50px',
      marginLeft: '32px',
      '& .MuiSelect-selectMenu': {
        height: '50px',
        display: 'flex',
        alignItems: 'center',
        paddingTop: 0,
        paddingBottom: 0,
      },
    },
  })
);

export default OrderDatePicker;
