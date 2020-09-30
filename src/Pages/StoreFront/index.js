import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';

import _ from 'lodash';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { useLazyQuery } from '@apollo/react-hooks';

import Header from './Components/Header';
import StoreInfo from './Components/StoreInfo';
import ProductContainer from './Components/ProductContainer';
import Footer from '../../SharedComponents/Footer';
import OpeningHoursModal from './Components/OpeningHoursModal';
import BannerPlaceHolder from '../../assets/img/store-banner-placeholder.png';
import { GET_MERCHANT_NET_PRICE } from '../../graphql/merchant/merchant-query';
import { GET_STORE_DATA } from '../../graphql/store/store-query';
import { getOrderTypes } from '../../utils/store';
import { UPDATE_MERCHANT_NET_PRICE, UPDATE_STORE_INFO } from '../../actions/actionTypes';
import { base64ToMerchantStoreId } from '../../constants';

const StoreFrontPage = () => {
  const { base64 } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    if (base64) {
      const getMerchantStoreId = async () => {
        const res = await base64ToMerchantStoreId(base64);
        if (res) {
          loadMerchantData();
          loadStoreData({
            variables: {
              id: res.storeId,
            },
          });
        } else {
          history.push('/');
        }
      };
      getMerchantStoreId();
    } else history.push('/');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [base64, history]);

  const classes = useStyles();
  const [showOpeningHourModal, setShowOpeningHourModal] = useState(false);
  const [loadStoreData, { loading: storeLoading, error: storeError, data: storeData }] = useLazyQuery(GET_STORE_DATA, {
    onCompleted(d) {
      console.log('*****');
      console.log(d);
      dispatch({
        type: UPDATE_STORE_INFO,
        payload: d.store,
      });
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

  const [loadMerchantData, { data: merchantNetPrice, loading: merchangNetPriceLoading }] = useLazyQuery(
    GET_MERCHANT_NET_PRICE,
    {
      onCompleted(d) {
        dispatch({
          type: UPDATE_MERCHANT_NET_PRICE,
          payload: d.merchantSettings.products.net_price,
        });
      },
    }
  );

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
    const store_openings = _.get(store, 'store_openings', []);
    if (store_openings === null || store_openings === undefined) return [];
    return store_openings;
  };

  return (
    <>
      <Header orderTypesList={getOrderTypes(storeData)} />

      <div className={classes.TopBanner} style={{ backgroundImage: `url(${getBannerImg()})` }}></div>

      <StoreInfo showOpeningHours={() => setShowOpeningHourModal(true)} />
      <ProductContainer storeLoading={storeLoading} />
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
