import React, { useState } from 'react';

import _ from 'lodash';
import { useQuery } from '@apollo/react-hooks';
import Box from '@material-ui/core/Box';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';

import DropDown from '../DropDown';
import { GET_CATEGORIES } from '../../graphql/categories/categories-query';
import { GET_STORE_SETTING_PRODUCT } from '../../graphql/store/store-query';
import { getOrderedCategories } from '../../utils/category';

const SearchInput = () => {
  const classes = useStyles();
  const [selectedCategory, setSelectedCategory] = useState({ id: '-1', label: 'All' });
  const { data, loading, error } = useQuery(GET_CATEGORIES);
  const { loading: storeSettingLoading, error: storeSettingError, data: storeSettingData } = useQuery(
    GET_STORE_SETTING_PRODUCT
  );

  const getCategoryMenuItems = () => {
    const categories = getOrderedCategories(data, storeSettingData);
    return [
      { id: '-1', label: 'All' },
      ...categories.map((item) => {
        return { id: item.id, label: item.name };
      }),
    ];
  };

  return (
    <Box className={classes.root}>
      <DropDown
        value={selectedCategory}
        onChange={(selected) => setSelectedCategory({ ...selected })}
        menuList={getCategoryMenuItems()}
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
      cursor: 'pointer',
      '& .MuiSvgIcon-root': {
        color: '#fff',
      },
    },
  })
);

export default SearchInput;
