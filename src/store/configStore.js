import { createStore, applyMiddleware, compose } from 'redux';
import { AsyncStorage } from 'react-native';
import { createLogger } from 'redux-logger';
import { persistStore, autoRehydrate, purgeStoredState } from 'redux-persist';
import { createEpicMiddleware } from 'redux-observable';
import Config from 'react-native-config';
import * as ActionTypes from 'actionTypes/appActionTypes';

import rootReducer from './indexReducers';
import rootEpic from './rootEpic';

// Env
const { PERSIST_ENABLED, PERSIST_PURGE, NODE_ENV } = Config;

// Common Middlewares
const epicMiddleware = createEpicMiddleware(rootEpic);
const middlewares = [epicMiddleware];
let enhancer = [];

if (NODE_ENV === 'development') {
  const logger = createLogger({
    duration: true,
    timestamp: true,
    collapsed: (getState, action) => {
      const types = [
        'Navigation/NAVIGATE',
        'Navigation/RESET',
        'RESET_ALL_ERRORS',
        'persist/REHYDRATE',
        'RESET_APP_ERRRORS',
      ];

      return types.includes(action.type);
    },
  });

  middlewares.push(logger);

  enhancer = compose(
    PERSIST_ENABLED === 'true' ? autoRehydrate() : f => f,
    applyMiddleware(...middlewares),
    window.__REDUX_DEVTOOLS_EXTENSION__ // eslint-disable-line
      ? window.__REDUX_DEVTOOLS_EXTENSION__({}) // eslint-disable-line
      : f => f,
  );
} else {
  enhancer = compose(autoRehydrate(), applyMiddleware(...middlewares));
}

const rootReducers = (state, action) => {
  let newState = state;

  if (newState) {
    const {
      app,
      user,
      navigation,
      missions,
      notifications,
      profile,
      paymentMeans,
      piggyBank,
      transfert,
      pairing,
      ...rest
    } = newState;

    if (action.type === ActionTypes.RESET_APP) {
      newState = {
        ...rest,
        nav: {
          index: 0,
          routes: [
            {
              routeName: 'Auth',
              key: rest.nav.routes[0].key,
            },
          ],
        },
      };
    } else if (action.type === ActionTypes.RESET_APP_ERRRORS) {
      newState = {
        ...newState,
        user: { ...user, error: '' },
        notifications: { ...notifications, error: '' },
        paymentMeans: { ...paymentMeans, error: '' },
        piggyBank: { ...piggyBank, error: '' },
      };
    }
  }

  return rootReducer(newState, action);
};

export default function configureStore() {
  const store = createStore(rootReducers, undefined, enhancer);

  if (PERSIST_PURGE === 'true') {
    purgeStoredState({ storage: AsyncStorage });
  }

  if (PERSIST_ENABLED === 'true') {
    persistStore(store, {
      storage: AsyncStorage,
      debounce: 500,
      blacklist: ['nav', 'navigation'],
    });
  }

  return store;
}
