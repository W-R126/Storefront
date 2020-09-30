import React, { useState } from 'react';

import moment from 'moment';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Typography, IconButton } from '@material-ui/core';
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker } from '@material-ui/pickers';
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';

export const OrderDatePicker = ({ title, date, onChange }) => {
  const classes = useStyles();
  const [editalbe, setEditable] = useState(false);
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
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="MM/dd/yyyy"
            margin="normal"
            id="date-picker-inline"
            label="Date"
            value={date.start}
            onChange={(d) => {
              onChange({
                ...date,
                start: moment(d),
              });
            }}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
            disablePast={true}
          />
          <KeyboardTimePicker
            margin="normal"
            id="time-picker-start"
            label="Start Time"
            value={date.start}
            onChange={(d) => {
              onChange({
                ...date,
                start: moment(d),
              });
            }}
            KeyboardButtonProps={{
              'aria-label': 'change time',
            }}
          />
          <KeyboardTimePicker
            margin="normal"
            id="time-picker-end"
            label="End Time"
            value={date.end}
            onChange={(d) => {
              onChange({
                ...date,
                end: moment(d),
              });
            }}
            KeyboardButtonProps={{
              'aria-label': 'change time',
            }}
          />
        </MuiPickersUtilsProvider>
      ) : (
        <>
          <Typography variant="h3">
            <span style={{ fontWeight: 'normal' }}>
              {`${date.start.format('HH:mm')} - ${date.end.format('HH:mm')}`}
            </span>
          </Typography>
          <Typography variant="h3">{date.start.format('DD MMMM YYYY')}</Typography>
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
