import React from 'react';
import { Provider } from 'react-redux';
import { StatusBar } from 'react-native';
import { ThemeProvider } from 'styled-components/native';
import Config from 'react-native-config';
import stripe from 'tipsi-stripe';

import { StyledContainerBasic } from 'styles/styledComponents/containers';

import appStyles from 'styles/appStyles';

import Router from './routes/Router';
import configureStore from './store/configStore';
// Env
const { stripeApiKey, NETWORK_DEBUG } = Config;

if (NETWORK_DEBUG === 'true') {
  const xhr = global.originalXMLHttpRequest
    ? global.originalXMLHttpRequest
    : global.XMLHttpRequest;

  global.XMLHttpRequest = xhr;
}

stripe.init({
  publishableKey: stripeApiKey,
  // merchantId: 'MERCHANT_ID', // Optional, for applePay
  androidPayMode: 'test', // Optional, android only, 'production' by default
});

export const store = configureStore();

const Root = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={appStyles}>
        <StyledContainerBasic>
          <Router />
          <StatusBar hidden />
        </StyledContainerBasic>
      </ThemeProvider>
    </Provider>
  );
};

export default Root;
