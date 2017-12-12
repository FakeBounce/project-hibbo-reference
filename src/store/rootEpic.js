// To be able to use Observable.stuff
import 'rxjs';

import { combineEpics } from 'redux-observable';
import {
  sendPayInToServerEpic,
  initializeTransactions,
} from 'epic/transfertEpic';
import {
  getProfilesEpic,
  getPaymentMeans,
  getPurchases,
} from 'epic/settingsEpic';
import { getWebsocketEpic } from 'epic/websocketEpic';
import {
  editUserProfile,
  editChildProfile,
  setProfileParentEpic,
  changeChildProfile,
} from 'epic/profileEpic';
import { readNotification, getNotifications } from 'epic/notificationsEpic';
import { createPiggyBank, initPiggyBanks } from 'epic/piggyBankEpic';
import {
  registerCard,
  createPayUser,
  createBankAccount,
} from 'epic/paymentMeansEpic';
import {
  logUser,
  registerUser,
  resetPassword,
  resetCheckCode,
  registerWithGoogle,
  loginWithGoogle,
  registerWithFb,
  loginWithFb,
  checkUserExist,
  changePassword,
} from 'epic/authEpic';
import resizeAndConvert from 'epic/pairingEpic';
import {
  addMission,
  completeMission,
  deleteMission,
  editMission,
  missionList,
} from 'epic/missionEpic';

const rootEpic = combineEpics(
  sendPayInToServerEpic,
  initializeTransactions,
  getProfilesEpic,
  getPaymentMeans,
  getPurchases,
  getWebsocketEpic,
  editUserProfile,
  changeChildProfile,
  createPiggyBank,
  initPiggyBanks,
  readNotification,
  getNotifications,
  registerCard,
  createPayUser,
  createBankAccount,
  logUser,
  registerUser,
  resetPassword,
  resetCheckCode,
  changePassword,
  registerWithGoogle,
  loginWithGoogle,
  registerWithFb,
  loginWithFb,
  setProfileParentEpic,
  checkUserExist,
  resizeAndConvert,
  addMission,
  completeMission,
  deleteMission,
  editMission,
  missionList,
  editChildProfile,
);

export default rootEpic;
