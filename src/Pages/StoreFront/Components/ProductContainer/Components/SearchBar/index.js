import React, { useState } from 'react';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';

const SearchBar = () => {
  const classes = useStyles();

  const [textSearchFocus, setTextSearchFocus] = useState(false);

  return (
    <Box className={classes.ComponentContainer}>
      <Grid container className={classes.TextSearch}>
        <SearchIcon className={textSearchFocus ? classes.TextFocused : classes.TextNormal} />
        <TextField
          id="standard-basic"
          fullWidth
          onFocus={() => setTextSearchFocus(true)}
          onBlur={() => {
            setTextSearchFocus(false);
          }}
        />
      </Grid>
    </Box>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    ComponentContainer: {
      position: 'relative',
      width: '100%',
      boxSizing: 'border-box',
      '& .MuiInputBase-input': {
        height: '60px',
        padding: '0 0 0 45px',
      },
    },
    TextSearch: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      '& .MuiSvgIcon-root': {
        position: 'absolute',
        left: '13px',
      },

      '& label.Mui-focused': {
        color: 'white',
      },
    },
    TextFocused: {
      color: theme.palette.primary.main,
    },
    TextNormal: {
      color: theme.palette.primary.dark,
    },
  })
);

export default SearchBar;
