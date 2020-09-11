import React from 'react';
import { connect, useSelector } from 'react-redux';

import _ from 'lodash';
import { useQuery } from '@apollo/react-hooks';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { GET_CATEGORIES } from '../../../../../../graphql/categories/categories-query';
import { getOrderedCategories } from '../../../../../../utils/category';
import { getIsShowSideCategory } from '../../../../../../utils/store';

import { updateCatgoryFilterAction } from '../../../../../../actions/productAction';
import DropDown from '../../../../../../SharedComponents/DropDown';

const CategorySideBar = ({ storeSettingData, updateCatgoryFilterAction }) => {
  const classes = useStyles();

  const { filter } = useSelector((state) => ({
    filter: state.productReducer.filter,
  }));

  const { data, loading, error } = useQuery(GET_CATEGORIES);

  if (!getIsShowSideCategory(storeSettingData)) {
    return null;
  }

  const handleChangeCategory = (value) => {
    updateCatgoryFilterAction(value);
  };

  const getSelectedDropDownValue = () => {
    const selectedCategory = filter.category;
    if (selectedCategory === 'all') return { id: 'all', label: 'All' };

    const categoryList = getOrderedCategories(data, storeSettingData);
    const findOne = categoryList.find((item) => item.id === selectedCategory);

    if (findOne) return { id: findOne.id, label: findOne.name };
    return { id: 'all', label: 'All' };
  };

  return (
    <>
      <Box className={classes.root}>
        <div className={classes.Title}>Categories</div>
        <MenuList className={classes.MenuList}>
          <MenuItem
            onClick={() => {
              handleChangeCategory('all');
            }}
            selected={'all' === filter.category}
          >
            All
          </MenuItem>
          {getOrderedCategories(data, storeSettingData).map((item, nIndex) => {
            return (
              <MenuItem
                onClick={() => {
                  handleChangeCategory(item.id);
                }}
                selected={item.id === filter.category}
                key={nIndex}
              >
                {item.name}
              </MenuItem>
            );
          })}
        </MenuList>
      </Box>
      <DropDown
        wrapperClass={classes.MobileWrapper}
        value={getSelectedDropDownValue()}
        menuList={getOrderedCategories(data, storeSettingData).map((item) => {
          return { id: item.id, label: item.name };
        })}
        onChange={(selected) => {
          handleChangeCategory(selected.id);
        }}
        buttonStyles={{ height: '60px' }}
      />
    </>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      flex: '1 1 100%',
      paddingRight: '8px',
      borderRight: '1px solid rgba(186, 195, 201, 0.5)',
      '@media screen and (max-width: 768px)': {
        display: 'none',
      },
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
        color: theme.palette.primary.text,
      },
      '& .Mui-selected': {
        background: theme.palette.primary.greyBack,
      },
    },
    MobileWrapper: {
      display: 'none',
      marginRight: '10px',
      '@media screen and (max-width: 768px)': {
        flex: '0 0 200px',
        display: 'flex',
      },
      '@media screen and (max-width: 480px)': {
        flex: '0 0 108px',
      },
    },
  })
);

export default connect(null, { updateCatgoryFilterAction })(CategorySideBar);
