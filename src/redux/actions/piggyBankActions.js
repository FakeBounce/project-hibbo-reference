import * as ActionTypes from 'actionTypes/piggyBankActionTypes';

import { getTranslations } from 'utils/i18n';

/* ***** *****  Set a piggy banks  ***** ***** */

export const initPiggyBanks = profileDatas => {
  return {
    type: ActionTypes.INIT_PIGGY_BANK,
    payload: {
      data: profileDatas,
    },
  };
};

/* ***** *****  Set a piggy bank amount ***** ***** */

export const setPiggyBankAmount = ({ amount }) => {
  return {
    type: ActionTypes.SET_PIGGY_BANK_AMOUNT,
    payload: {
      amount,
    },
  };
};

/* ***** *****  Set a piggy bank  ***** ***** */

export const setPiggyBank = piggybank => {
  return {
    type: ActionTypes.SET_PIGGY_BANK,
    payload: {
      piggybank,
    },
  };
};

/* ***** *****  Failure to set a piggy bank  ***** ***** */

export const setPiggyBankFailure = error => {
  const { message } = error._bodyText ? JSON.parse(error._bodyText) : error;

  return {
    type: ActionTypes.SET_PIGGY_BANK_FAILURE,
    payload: {
      error: getTranslations(message),
    },
  };
};

/* ***** *****  Create a piggy bank  ***** ***** */

export const createPiggyBank = data => {
  return {
    type: ActionTypes.CREATE_PIGGY_BANK,
    payload: {
      data,
    },
  };
};
