import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ApolloProvider, ApolloClient } from '@apollo/client';
import { ApolloLink } from 'apollo-link';
import { createUploadLink } from 'apollo-upload-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { onError } from 'apollo-link-error';
import { Observable } from 'rxjs';

import { MuiThemeProvider } from '@material-ui/core/styles';
import { THEME } from './theme';
import store from './store';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { getStoreId, getMerchantId } from './constants';
import CONFIG from './config';

const uploadLink = createUploadLink({
  uri: CONFIG.API_BASE_URL,
});

const errorLink = onError(({ graphQLErrors, networkError, forward, operation }) => {
  if (graphQLErrors) {
    debugger;
    // eslint-disable-next-line array-callback-return
    graphQLErrors.map(({ message, locations, path, extensions }: any) => {
      if (extensions && extensions.code === 'UNAUTHENTICATED') {
        // toast.info('Please, enter the system.');
      } else {
        // toast.error(message.message || message);
      }
      console.error(
        `[GraphQL error]: Message: ${JSON.stringify(message)}, Location: ${JSON.stringify(locations)}, Path: ${path}`
      );
    });
  }
  if (networkError) console.log(`[Network error]: ${networkError}`);
  return forward(operation);
});

const authorizationLink = new ApolloLink(
  (operation, forward) =>
    new Observable((observer) => {
      const token = localStorage.getItem('token');
      const merchantId = getMerchantId();
      const storeId = getStoreId();

      operation.setContext({
        headers: {
          authorization: token ? `Bearer ${token}` : 'Bearer Guest',
          'Content-Type': 'application/json',
          ...(merchantId && { 'X-Myda-Merchant': merchantId }),
          ...(storeId && { 'X-Myda-Store': storeId }),
        },
      });

      const sub = forward(operation).subscribe({
        next: (result) => {
          // Some how get extensions passed from server
          if (result && result.data && result.extensions) result.data.extensions = result.extensions;
          observer.next(result);
        },
        // error: (error) => {...}
        complete: observer.complete.bind(observer),
      });
      return () => {
        if (sub) sub.unsubscribe();
      };
    })
);

const cache = new InMemoryCache();

const client = new ApolloClient({
  link: authorizationLink.concat(errorLink).concat(uploadLink),
  cache,
  resolvers: {},
  connectToDevTools: true,
  defaultOptions: {
    query: {
      fetchPolicy: 'no-cache',
    },
  },
});

ReactDOM.render(
  <MuiThemeProvider theme={THEME}>
    <ApolloProvider client={client}>
      <Provider store={store}>
        <App />
      </Provider>
    </ApolloProvider>
  </MuiThemeProvider>,

  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
