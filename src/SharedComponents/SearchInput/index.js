import React from 'react';

import Box from '@material-ui/core/Box';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';

import DropDown from '../DropDown';

const SearchInput = () => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <DropDown
        value={{ id: '1', label: 'All' }}
        menuList={[
          { id: '1', label: 'All' },
          { id: '2', label: 'Category1' },
          { id: '3', label: 'Category2' },
          { id: '4', label: 'Category3' },
        ]}
        wrapperStyles={{ minWidth: '105px', flex: '1 1 105px' }}
      />
      <input className={classes.SearchField} />
      <button className={classes.SearchButton}>
        <SearchIcon />
      </button>
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
    },
    SearchField: {
      flex: '1 1 100%',
      height: '40px',
      padding: '10px',
      fontSize: '16px',
      lineHeight: '16px',
      boxSizing: 'border-box',
      color: theme.palette.primary.dark,
      borderLeft: 0,
      borderRight: 0,
      borderTop: `1px solid ${theme.palette.primary.border}`,
      borderBottom: `1px solid ${theme.palette.primary.border}`,
      outline: 'none',
    },
    SearchButton: {
      width: '40px',
      height: '40px',
      borderRadius: 0,
      borderTopRightRadius: '2px',
      borderBottomRightRadius: '2px',
      background: theme.palette.primary.yellow,
      outline: 'none',
      border: 'none',
      '& .MuiSvgIcon-root': {
        color: '#fff',
      },
    },
  })
);

export default SearchInput;
