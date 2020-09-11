import React, { useState, useEffect } from 'react';
import { connect, useSelector } from 'react-redux';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';

import { updateSearchStrProductAction } from '../../../../../../actions/productAction';

const SearchBar = ({ updateSearchStrProductAction }) => {
  const classes = useStyles();

  const { filter } = useSelector((state) => ({
    filter: state.productReducer.filter,
  }));

  const [textSearchFocus, setTextSearchFocus] = useState(false);
  const [searchStr, setSearchStr] = useState('');

  useEffect(() => {
    setSearchStr(filter.searchStr);
  }, [filter.searchStr]);

  const handleChangeBlur = (e) => {
    setTextSearchFocus(false);

    const newValue = e.target.value.trim().toLowerCase();
    if (newValue === filter.searchStr.toLowerCase()) return;
    updateSearchStrProductAction(newValue);
  };

  const handleKeyUp = (e) => {
    if (e.keyCode === 13) {
      const newValue = e.target.value.trim().toLowerCase();
      if (newValue === filter.searchStr.toLowerCase()) return;
      updateSearchStrProductAction(newValue);
    }
  };

  return (
    <Box className={classes.ComponentContainer}>
      <Grid container className={classes.TextSearch}>
        <SearchIcon className={textSearchFocus ? classes.TextFocused : classes.TextNormal} />
        <TextField
          id="standard-basic"
          fullWidth
          onFocus={() => setTextSearchFocus(true)}
          onBlur={(e) => {
            handleChangeBlur(e);
          }}
          value={searchStr}
          onChange={(e) => {
            setSearchStr(e.target.value.trim());
          }}
          onKeyUp={handleKeyUp}
          className={classes.DesktopInput}
          placeholder="Search Product"
        />
        <TextField
          id="standard-basic"
          fullWidth
          onFocus={() => setTextSearchFocus(true)}
          onBlur={(e) => {
            handleChangeBlur(e);
          }}
          value={searchStr}
          onChange={(e) => {
            setSearchStr(e.target.value.trim());
          }}
          onKeyUp={handleKeyUp}
          className={classes.MobileInput}
          placeholder="Search Product"
          variant="outlined"
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
      flex: '1 1 100%',
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
      color: theme.palette.primary.text,
    },

    DesktopInput: {
      display: 'inline-flex',
      '@media screen and (max-width: 768px)': {
        display: 'none',
      },
    },
    MobileInput: {
      display: 'none',
      '@media screen and (max-width: 768px)': {
        display: 'inline-flex',
      },
    },
  })
);

export default connect(null, { updateSearchStrProductAction })(SearchBar);
