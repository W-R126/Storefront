import _ from 'lodash';
import { getProductViewFromStoreSetting } from './store';

export const getOrderedCategories = (categoryData, storeSettingData) => {
  if (categoryData === undefined || categoryData === null) {
    return [];
  } else {
    if (storeSettingData === undefined || storeSettingData === null) return _.get(categoryData, 'categories', []);
    else {
      const productView = getProductViewFromStoreSetting(storeSettingData);
      const categoryOrders = _.get(productView, 'categories', []);
      const categories = _.get(categoryData, 'categories', []);
      let orderedCategories = [];

      if (categoryOrders.length === 0 || !productView.by_category) {
        orderedCategories = [...categories];
      } else {
        categoryOrders.forEach((item) => {
          const finedOne = categories.find((categoryItem) => categoryItem.id === item.id);
          if (finedOne)
            orderedCategories.push({
              ...finedOne,
              position: item.position,
            });
        });
      }

      if (productView.sort_by_name) {
        return orderedCategories.sort((a, b) => a.name - b.name);
      }
      return orderedCategories;
    }
  }
};
