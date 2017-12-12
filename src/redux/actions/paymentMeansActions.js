import * as ActionTypes from 'actionTypes/paymentMeansActionTypes';
import { getTranslations } from 'utils/i18n';

/* ***** *****  Save card  ***** ***** */

export const saveBankAccount = bankData => {
  return {
    type: ActionTypes.SAVE_BANK_ACCOUNT,
    payload: {
      bankData,
    },
  };
};

/* ***** *****  Save card  ***** ***** */

export const saveCard = cardData => {
  return {
    type: ActionTypes.SAVE_CARD,
    payload: {
      cardData,
    },
  };
};

/* ***** *****  Set card error  ***** ***** */

export const setPaymentMeanError = error => {
  let errorMsg = '';

  if (error._bodyText !== undefined) {
    errorMsg = JSON.parse(error._bodyText).message;
  } else if (error !== '') {
    errorMsg = getTranslations(error ? error.message : 'error.generic');
  }

  return {
    type: ActionTypes.SAVE_CARD_ERROR,
    payload: {
      error: getTranslations(errorMsg),
    },
  };
};

/* ***** *****  Clea card erros  ***** ***** */

export const clearCardErrors = () => {
  return {
    type: ActionTypes.CLEAR_CARD_ERROR,
  };
};

/* ***** *****  Create MongoPay user error  ***** ***** */

export const createPayUserError = error => {
  const { message } = error._bodyText ? JSON.parse(error._bodyText) : error;

  return {
    type: ActionTypes.CREATE_PAY_USER_ERROR,
    payload: {
      error: getTranslations(message),
    },
  };
};

/* ***** *****  Set a card ID  ***** ***** */

export const setCardId = cardId => {
  return {
    type: ActionTypes.SET_CARD_ID,
    payload: {
      cardId,
    },
  };
};

/* ***** *****  Set selected bank account ***** ***** */

export const setSelectedBankAccount = bankAccount => {
  return {
    type: ActionTypes.SET_SELECTED_BANK_ACCOUNT,
    payload: {
      bankAccount,
    },
  };
};

export const setPaymentMeansParent = paymentMeans => {
  return {
    type: ActionTypes.SET_PAYMENTMEANS_DATA_PARENT,
    payload: {
      ...paymentMeans,
    },
  };
};

export const setPaymentMeansChild = paymentMeans => {
  return {
    type: ActionTypes.SET_PAYMENTMEANS_DATA_CHILD,
    payload: {
      ...paymentMeans,
    },
  };
};
