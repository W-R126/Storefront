import React, { useState } from 'react';

import moment from 'moment';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Typography, IconButton, TextField } from '@material-ui/core';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';

export const OrderDatePicker = ({ title, date, onChange }) => {
  const classes = useStyles();
  const [editalbe, setEditable] = useState(false);

  const getHoursFromHHMM = (strHHMM) => {
    return parseInt(strHHMM.substr(0, 2));
  };

  const getMinutesFromHHMM = (strHHMM) => {
    return parseInt(strHHMM.substr(3, 2));
  };

  const getStartTimeValidate = () => {
    const curValue = new Date().valueOf();
    if (curValue > date.start.valueOf()) return "Start time can't be past time.";
    if (date.start.valueOf() >= date.end.valueOf()) return 'Start time should be before the end time.';
    return '';
  };

  const getEndTimeValidate = () => {
    if (date.end.valueOf() < date.start.valueOf()) return 'End time should be after the start time.';
    return '';
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
          <TextField
            className={classes.StartTime}
            id="start-time"
            label="Start Time"
            type="time"
            value={date.start.format('HH:mm')}
            onChange={(e) => {
              onChange({
                ...date,
                start: date.start.set({
                  hour: getHoursFromHHMM(e.target.value),
                  minute: getMinutesFromHHMM(e.target.value),
                }),
              });
            }}
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              step: 300, // 5 min
            }}
            error={getStartTimeValidate().length > 0 ? true : false}
            helperText={getStartTimeValidate()}
          />

          <TextField
            id="end-time"
            className={classes.EndTime}
            label="End Time"
            type="time"
            value={date.end.format('HH:mm')}
            onChange={(e) => {
              onChange({
                ...date,
                end: date.end.set({
                  hour: getHoursFromHHMM(e.target.value),
                  minute: getMinutesFromHHMM(e.target.value),
                }),
              });
            }}
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              step: 300, // 5 min
            }}
            error={getEndTimeValidate().length > 0 ? true : false}
            helperText={getEndTimeValidate()}
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
    StartTime: {
      width: '100%',
      margin: '10px 0 0 0',
    },
    EndTime: {
      width: '100%',
      margin: '20px 0 0 0',
    },
  })
);

export default OrderDatePicker;
