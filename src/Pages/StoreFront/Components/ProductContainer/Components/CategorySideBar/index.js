import React, { useState } from 'react';
import _ from 'lodash';
import { useQuery } from '@apollo/react-hooks';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { GET_CATEGORIES } from '../../../../../../graphql/categories/categories-query';
import { GET_STORE_SETTING_PRODUCT } from '../../../../../../graphql/store/store-query';
import { getOrderedCategories } from '../../../../../../utils/category';
import { getIsShowSideCategory } from '../../../../../../utils/store';

const CategorySideBar = () => {
  const classes = useStyles();
  const { data, loading, error } = useQuery(GET_CATEGORIES);
  const { loading: storeSettingLoading, error: storeSettingError, data: storeSettingData } = useQuery(
    GET_STORE_SETTING_PRODUCT
  );
  const [selectedMenu, setMenu] = useState();
  if (!getIsShowSideCategory(storeSettingData)) {
    return null;
  }
  return (
    <Box className={classes.root}>
      <div className={classes.Title}>Categories</div>
      <MenuList className={classes.MenuList}>
        {getOrderedCategories(data, storeSettingData).map((item, nIndex) => {
          return (
            <MenuItem
              onClick={() => {
                setMenu(item.id);
              }}
              selected={item.id === selectedMenu}
              key={nIndex}
            >
              {item.name}
            </MenuItem>
          );
        })}
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
        color: theme.palette.primary.text,
      },
      '& .Mui-selected': {
        background: theme.palette.primary.greyBack,
      },
    },
  })
);

export default CategorySideBar;
