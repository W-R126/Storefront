import React, { useState } from 'react';
import _ from 'lodash';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { useQuery } from '@apollo/react-hooks';

import Header from '../../SharedComponents/Header';
import StoreInfo from './Components/StoreInfo';
import ProductContainer from './Components/ProductContainer';
import Footer from '../../SharedComponents/Footer';
import OpeningHoursModal from './Components/OpeningHoursModal';
import { GET_STORE_DATA } from '../../graphql/store/store-query';
import { getOrderTypes } from '../../utils/store';

const StoreFrontPage = () => {
  const classes = useStyles();
  const [showOpeningHourModal, setShowOpeningHourModal] = useState(false);
  const { loading: storeLoading, error: storeError, data: storeData } = useQuery(GET_STORE_DATA, {
    variables: { id: 'a0be564c-a982-471f-a4b5-5bdf6e29e1c2' },
    // onCompleted: (d) => {
    //   setShowOpeningHourModal(true);
    // },
  });

  const getBannerImg = () => {
    const store = _.get(storeData, 'store', null);
    if (store) {
      return store.settings.touchpoint_settings.digital_front.banner.url;
    }
    return '';
  };

  const getStoreOpening = () => {
    const store = _.get(storeData, 'store', {});
    return _.get(store, 'store_openings', []);
  };

  return (
    <>
      <Header orderTypesList={getOrderTypes(storeData)} />
      <div className={classes.TopBanner} style={{ backgroundImage: `url(${getBannerImg()})` }}></div>
      {_.get(storeData, 'store', null) !== null && (
        <StoreInfo loading={storeLoading} error={storeError} store={_.get(storeData, 'store', {})} />
      )}
      <ProductContainer />
      <Footer />
      <OpeningHoursModal
        open={showOpeningHourModal}
        hideModal={() => {
          setShowOpeningHourModal(false);
        }}
        store_openings={getStoreOpening()}
      />
    </>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    TopBanner: {
      width: '100%',
      height: '398px',
      backgroundSize: 'cover',
      marginTop: '80px',
      overflow: 'hidden',
      '@media screen and (max-width: 1439px)': {
        height: '350px',
      },
      '@media screen and (max-width: 1199px)': {
        height: '300px',
      },
      '@media screen and (max-width: 767px)': {
        height: '205px',
        marginTop: '70px',
      },
    },
  })
);
export default StoreFrontPage;
