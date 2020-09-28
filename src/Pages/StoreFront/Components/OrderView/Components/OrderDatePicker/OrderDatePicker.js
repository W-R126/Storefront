import React, { useState } from 'react';

import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import moment from 'moment';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Typography, IconButton } from '@material-ui/core';
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker } from '@material-ui/pickers';
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';

export const OrderDatePicker = ({ date, onChange }) => {
  const classes = useStyles();
  const [editalbe, setEditable] = useState(false);
  // const handleDateChange = (date) => {
  //   setSelectedDate(date);
  // };

  return (
    <>
      <Typography variant="h4" className={classes.Title}>
        Delivery slot
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
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="MM/dd/yyyy"
            margin="normal"
            id="date-picker-inline"
            label="Date"
            value={date}
            onChange={onChange}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
          <KeyboardTimePicker
            margin="normal"
            id="time-picker-start"
            label="Start Time"
            value={date}
            onChange={onChange}
            KeyboardButtonProps={{
              'aria-label': 'change time',
            }}
          />
          <KeyboardTimePicker
            margin="normal"
            id="time-picker-end"
            label="End Time"
            value={date}
            onChange={onChange}
            KeyboardButtonProps={{
              'aria-label': 'change time',
            }}
          />
        </MuiPickersUtilsProvider>
      ) : (
        <>
          <Typography variant="h3">
            <span style={{ fontWeight: 'normal' }}>
              10:00 - 11:00
              {/* {moment.format('HH:mm')} */}
            </span>
          </Typography>
          <Typography variant="h3">{moment(date).format('DD MMMM YYYY')}</Typography>
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
  })
);

export default OrderDatePicker;
