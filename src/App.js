import React from 'react';
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';

import { ApolloProvider } from '@apollo/react-hooks';
import { ApolloClient } from '@apollo/client';
import { ApolloLink } from 'apollo-link';
import { createUploadLink } from 'apollo-upload-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { onError } from 'apollo-link-error';

import StoreFrontPage from './Pages/StoreFront';

const uploadLink = createUploadLink({
  uri: 'https://zd0dv59fq9.execute-api.eu-west-1.amazonaws.com/staging',
});

const errorLink = onError(({ graphQLErrors, networkError, forward, operation }) => {
  if (graphQLErrors) {
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

const authorizationLink = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem('token');
  // const merchant = localStorage.getItem('merchant');
  // const storeJson = localStorage.getItem('store');
  // const store = storeJson ? JSON.parse(storeJson) : null;
  const merchant = '4e20a0ea-9a66-4732-b53b-7e692ede0c45';
  const storeId = 'a0be564c-a982-471f-a4b5-5bdf6e29e1c2';

  operation.setContext({
    headers: {
      authorization: token ? `Bearer ${token}` : 'Bearer Guest',
      'Content-Type': 'application/json',
      ...(merchant && { 'X-Myda-Merchant': merchant }),
      // ...(store && { 'X-Myda-Store': store.id }),
      'X-Myda-Store': storeId,
    },
  });
  return forward(operation);
});

const cache = new InMemoryCache();

const client = new ApolloClient({
  link: authorizationLink.concat(errorLink).concat(uploadLink),
  cache,
  resolvers: {},
  connectToDevTools: true,
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="App">
          <Switch>
            <Route path="/" component={StoreFrontPage} />
          </Switch>
        </div>
      </Router>
    </ApolloProvider>
  );
};

export default App;
