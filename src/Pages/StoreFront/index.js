import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import _ from 'lodash';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { useQuery } from '@apollo/react-hooks';

import Header from './Components/Header';
import StoreInfo from './Components/StoreInfo';
import ProductContainer from './Components/ProductContainer';
import Footer from '../../SharedComponents/Footer';
import OpeningHoursModal from './Components/OpeningHoursModal';
import { GET_STORE_DATA } from '../../graphql/store/store-query';
import { GET_STORE_SETTING_PRODUCT } from '../../graphql/store/store-query';
import { getOrderTypes } from '../../utils/store';
import { getStoreId } from '../../constants';
import BannerPlaceHolder from '../../assets/img/store-banner-placeholder.png';
import { base64ToMerchantStoreId, TESTBASE64_URL } from '../../constants';
const StoreFrontPage = () => {
  const { base64 } = useParams();

  useEffect(() => {
    if (base64) base64ToMerchantStoreId(base64);
    else base64ToMerchantStoreId(TESTBASE64_URL);
  }, [base64]);

  const classes = useStyles();
  const [showOpeningHourModal, setShowOpeningHourModal] = useState(false);
  const { loading: storeLoading, error: storeError, data: storeData } = useQuery(GET_STORE_DATA, {
    variables: { id: getStoreId() },
    onCompleted(d) {
      if (d.store.merchant.tname) {
        document.title = `${d.store.merchant.tname} | Storefront | Myda`;
      }
      try {
        if (d.store.merchant.logo.url) {
          const favicon = document.getElementById('favicon');
          favicon.href = d.store.merchant.logo.url;
        }
      } catch (err) {
        console.log('Set Page Icon error');
      }
    },
  });

  const { data: storeSettingData } = useQuery(GET_STORE_SETTING_PRODUCT);

  const getBannerImg = () => {
    const store = _.get(storeData, 'store', null);
    if (!store || !store.settings.touchpoint_settings.digital_front.banner.url) {
      return BannerPlaceHolder;
    }
    if (storeLoading) return BannerPlaceHolder;
    return store.settings.touchpoint_settings.digital_front.banner.url;
  };

  const getStoreOpening = () => {
    const store = _.get(storeData, 'store', {});
    return _.get(store, 'store_openings', []);
  };

  return (
    <>
      <Header orderTypesList={getOrderTypes(storeData, storeSettingData)} storeSettingData={storeSettingData} />

      <div className={classes.TopBanner} style={{ backgroundImage: `url(${getBannerImg()})` }}></div>

      <StoreInfo
        loading={storeLoading}
        error={storeError}
        store={_.get(storeData, 'store', {})}
        showOpeningHours={() => setShowOpeningHourModal(true)}
      />
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
      backgroundPosition: 'center',
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
