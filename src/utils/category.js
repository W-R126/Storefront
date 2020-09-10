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
        if (productView.show_selected) {
          let maxOrderValue = Math.max.apply(
            Math,
            categoryOrders.map(function (o) {
              return o.position;
            })
          );

          categories.forEach((item) => {
            const findOne = categoryOrders.find((itemOne) => itemOne.id === item.id);
            if (findOne)
              orderedCategories.push({
                ...item,
                position: findOne.position,
              });
            else {
              maxOrderValue++;
              orderedCategories.push({
                ...item,
                position: maxOrderValue,
              });
            }
          });

          orderedCategories = [...orderedCategories.sort((a, b) => a.position - b.position)];
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
