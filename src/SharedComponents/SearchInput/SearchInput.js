import React from 'react';

import Box from '@material-ui/core/Box';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import { Button, TextField } from '@material-ui/core';

const SearchInput = () => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <TextField
        className={classes.SearchField}
        placeholder="Search"
        variant="outlined"
        InputProps={{
          endAdornment: (
            <Button className={classes.SearchButton}>
              <SearchIcon />
            </Button>
          ),
        }}
        fullWidth
      />
    </Box>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      marginLeft: '57px',
      width: '432px',
      height: '40px',

      '@media screen and (max-width: 1439px)': {
        width: '350px',
      },

      '@media screen and (max-width: 1199px)': {
        display: 'none',
      },
    },
    CategoryDropDown: {
      minWidth: '105px',
      flex: '1 1 105px',
    },
    SearchField: {
      // flex: '1 1 100%',
      // height: '40px',
      // padding: '10px',
      // fontSize: '16px',
      // lineHeight: '16px',
      // boxSizing: 'border-box',
      // color: theme.palette.primary.text,
      // border: `1px solid ${theme.palette.primary.border}`,
      // borderRight: 0,
      // outline: 'none',
      // backgroundColor: 'rgba(186, 195, 201, 0.4)',
      // borderTopLeftRadius: '4px',
      // borderBottomLeftRadius: '4px',
      '& .MuiOutlinedInput-adornedEnd': {
        paddingRight: 0,
      },
      '& .MuiOutlinedInput-input': {
        paddingRight: 0,
        height: '40px',
        lineHeight: '20px',
        paddingTop: '10px',
        paddingBottom: '10px',
        boxSizing: 'border-box',
        backgroundColor: 'rgba(186, 195, 201, 0.4)',
        borderTopLeftRadius: '4px',
        borderBottomLeftRadius: '4px',
      },
      '& .Mui-focused': {
        '& .MuiOutlinedInput-input': {
          backgroundColor: 'white',
        },
        '& .MuiOutlinedInput-notchedOutline': {
          border: `1px solid ${theme.palette.primary.border}`,
        },
      },
      '& .MuiOutlinedInput-notchedOutline': {
        border: 'none',
      },
    },
    SearchButton: {
      width: '47px',
      height: '40px',
      borderRadius: 0,
      borderTopRightRadius: '4px',
      borderBottomRightRadius: '4px',
      background: theme.palette.primary.yellow,
      outline: 'none',
      border: 'none',
      cursor: 'pointer',
      '&:hover': {
        '&:hover': {
          backgroundColor: '#f6b601',
        },
      },
      '& .MuiSvgIcon-root': {
        color: '#fff',
      },
    },
  })
);

export default SearchInput;
