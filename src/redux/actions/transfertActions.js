import { getTranslations } from 'utils/i18n';
import * as ActionTypes from 'actionTypes/transfertActionTypes';
import { SET_ERROR } from 'actionTypes/notificationsActionTypes';

/* ***** *****  Transfert start  ***** ***** */

export const transfertStart = (transfertData, actionType = 'payIn') => {
  return {
    type: ActionTypes.SEND_PAYIN_TO_SERVER,
    payload: {
      data: {
        ...transfertData,
      },
      actionType,
    },
  };
};

/* ***** *****  Transfert initialize  ***** ***** */

export const initializeTransactions = (profileId, token, accountId) => {
  return {
    type: ActionTypes.TRANSFERT_INITIALIZE,
    payload: {
      profileId,
      token,
      accountId,
    },
  };
};

/* ***** *****  Transfert success  ***** ***** */

export const transfertSuccess = () => {
  return {
    type: ActionTypes.TRANSFERT_SUCCESS,
  };
};

/* ***** *****  Transfert error  ***** ***** */

export const transfertError = error => {
  const { message } = error._bodyText ? JSON.parse(error._bodyText) : error;

  console.log('ERROR GOT IN TRANSFERT', message);
  return {
    type: SET_ERROR,
    payload: {
      errorMsg: getTranslations(message),
    },
  };
};

/* ***** *****  Transfert success  ***** ***** */

export const setTransactions = transactions => {
  return {
    type: ActionTypes.SET_TRANSACTIONS,
    payload: {
      transactions,
    },
  };
};
