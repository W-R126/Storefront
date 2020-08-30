import React, { useState } from 'react';

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import { TextField } from '@material-ui/core';

const EditableLabel = ({ wrapperClass, value, onChange, label = '' }) => {
  const [edit, setEdit] = useState(false);
  const classes = useStyles();

  const rootClasses = [classes.root];
  if (wrapperClass) rootClasses.push(wrapperClass);
  return (
    <Box className={rootClasses.join(' ')}>
      {edit ? (
        <TextField
          label={label}
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
          }}
          onBlur={() => {
            setEdit(false);
          }}
          autoFocus={true}
        />
      ) : (
        <>
          <span className={classes.Value}>{value}</span>
          <IconButton onClick={() => setEdit(true)}>
            <CreateOutlinedIcon />
          </IconButton>
        </>
      )}
    </Box>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '50px',
    },
  })
);
export default EditableLabel;
