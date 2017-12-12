import { combineReducers } from 'redux';

import user from 'reducers/userReducer';
import navigation from 'reducers/navigationReducer';
import notifications from 'reducers/notificationsReducer';
import profile from 'reducers/profileReducer';
import paymentMeans from 'reducers/paymentMeansReducer';
import app from 'reducers/appReducer';
import piggyBank from 'reducers/piggyBankReducer';
import missions from 'reducers/missionReducer';
import transfert from 'reducers/transfertReducer';
import pairing from 'reducers/pairingReducer';
import nav from '../routes/navReducer';

const rootReducer = combineReducers({
  app,
  nav,
  user,
  navigation,
  missions,
  notifications,
  profile,
  paymentMeans,
  piggyBank,
  transfert,
  pairing,
});

export default rootReducer;
