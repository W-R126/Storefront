import React, { useState, useEffect } from 'react';
import { connect, useSelector } from 'react-redux';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';

import useDebounce from '../../../../../../utils/debounce';

import { updateSearchStrProductAction } from '../../../../../../actions/productAction';

const SearchBar = ({ updateSearchStrProductAction }) => {
  const classes = useStyles();

  const { filterSearchStr } = useSelector((state) => ({
    filterSearchStr: state.productReducer.filter.searchStr,
  }));
  const [textSearchFocus, setTextSearchFocus] = useState(false);
  const [searchStr, setSearchStr] = useState(filterSearchStr);

  const debouncedSearchTerm = useDebounce(searchStr, 500);

  const handleChangeBlur = (e) => {
    setTextSearchFocus(false);
  };

  useEffect(() => {
    if (debouncedSearchTerm) {
      updateSearchStrProductAction(searchStr);
    }
  }, [debouncedSearchTerm, searchStr, updateSearchStrProductAction]);

  return (
    <Box className={classes.ComponentContainer}>
      <Grid container className={classes.TextSearch}>
        <TextField
          id="standard-basic"
          fullWidth
          onFocus={() => setTextSearchFocus(true)}
          onBlur={handleChangeBlur}
          value={searchStr}
          onChange={(e) => setSearchStr(e.target.value)}
          className={classes.DesktopInput}
          placeholder="Search Product"
        />
        <SearchIcon className={textSearchFocus ? classes.TextFocused : classes.TextNormal} />
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
      color: '#939da8',
    },

    DesktopInput: {
      display: 'inline-flex',
      backgroundColor: '#f3f5f7',
      '& .Mui-focused': {
        backgroundColor: 'white',
      },
      '& .Mui-focused:before': {
        borderBottom: '1px solid #1174f2',
      },
      '& .MuiInput-underline:before': {
        border: 'none',
      },
      '& .MuiInput-underline:after': {
        borderBottom: `1px solid ${theme.palette.primary.main}`,
      },
      '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
        borderBottom: '1px solid rgba(0, 0, 0, 0.42)',
      },
    },
  })
);

export default connect(null, { updateSearchStrProductAction })(SearchBar);
