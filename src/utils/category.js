import _ from 'lodash';
import { getProductViewFromStoreSetting } from './store';

export const getOrderedCategories = (categoryData, storeInfo) => {
  if (categoryData === undefined || categoryData === null) {
    return [];
  } else {
    if (storeInfo === undefined || storeInfo === null || Object.keys(storeInfo).length === 0)
      return _.get(categoryData, 'categories', []);
    else {
      const productView = getProductViewFromStoreSetting(storeInfo);
      const categoryOrders = _.get(productView, 'categories', []);
      const categories = _.get(categoryData, 'categories', []);
      let orderedCategories = [];

      if (categoryOrders.length === 0 || !productView.by_category) {
        orderedCategories = [...categories];
      } else {
        if (productView.show_selected) {
          categoryOrders
            .sort((a, b) => a.position - b.position)
            .forEach((item) => {
              const findOne = categories.find((itemOne) => itemOne.id === item.id);
              if (findOne)
                orderedCategories.push({
                  ...findOne,
                  position: item.position,
                });
            });
        } else {
          orderedCategories = [...categories];
        }
      }

      if (productView.sort_by_name) {
        return orderedCategories.sort((a, b) => a.name - b.name);
      }
      return orderedCategories;
    }
  }
};
