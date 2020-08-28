import React from 'react';

import { useQuery } from '@apollo/react-hooks';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { GET_CATEGORIES } from '../../../../../../graphql/categories/categories-query';

const CategorySideBar = () => {
  const classes = useStyles();
  // const { data, loading, erro } = useQuery(GET_CATEGORIES);
  // debugger;
  return (
    <Box className={classes.root}>
      <div className={classes.Title}>Categories</div>
      <MenuList className={classes.MenuList}>
        <MenuItem selected>Alchole(120)</MenuItem>
        <MenuItem>Confecetionery(54)</MenuItem>
        <MenuItem>Groceries(60)</MenuItem>
        <MenuItem>Diary(18)</MenuItem>
        <MenuItem>Ethnic Products(12)</MenuItem>
        <MenuItem>Medicines(44)</MenuItem>
        <MenuItem>Tobaco(65)</MenuItem>
      </MenuList>
    </Box>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      flex: '0 0 238px',
      paddingRight: '8px',
      borderRight: '1px solid rgba(186, 195, 201, 0.5)',
    },
    Title: {
      fontSize: '20px',
      fontWeight: 500,
      color: theme.palette.primary.title,
    },
    MenuList: {
      margin: '30px 0 0 0',
      '& .MuiListItem-root': {
        padding: '20px',
        height: '60px',
        fontSize: '16px',
        color: theme.palette.primary.dark,
      },
      '& .Mui-selected': {
        background: theme.palette.primary.greyBack,
      },
    },
  })
);

export default CategorySideBar;
