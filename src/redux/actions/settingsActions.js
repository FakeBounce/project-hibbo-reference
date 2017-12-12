import { apiKey } from 'utils/api';
import * as ActionTypes from 'actionTypes/settingsActionTypes';

/* ***** *****  Get profiles start  ***** ***** */

export const getProfilesStart = () => {
  return {
    type: ActionTypes.GET_PROFILES_START,
  };
};

/* ***** *****  Get profile success  ***** ***** */

export const getProfilesSuccess = profiles => {
  return {
    type: ActionTypes.GET_PROFILES_SUCCESS,
    payload: profiles,
  };
};

/* ***** *****  Get profile failure  ***** ***** */

export const getProfilesFailure = error => {
  return {
    type: ActionTypes.GET_PROFILES_FAILURE,
    payload: {
      error,
    },
  };
};

/* ***** *****  Get payment means start  ***** ***** */

export const getPaymentMeansStart = formData => {
  return {
    type: ActionTypes.GET_PAYMENT_MEANS_START,
    payload: {
      data: {
        ...formData,
        apiKey,
      },
    },
  };
};

/* ***** *****  Get payment means success  ***** ***** */

export const getPaymentMeansSuccess = paymentMeans => {
  return {
    type: ActionTypes.GET_PAYMENT_MEANS_SUCCESS,
    payload: {
      paymentMeans,
    },
  };
};

/* ***** *****  Get payment means failure  ***** ***** */

export const getPaymentMeansFailure = error => {
  return {
    type: ActionTypes.GET_PAYMENT_MEANS_FAILURE,
    payload: {
      error,
    },
  };
};

/* ***** *****  Get purchases start  ***** ***** */

export const getPurchasesStart = formData => {
  return {
    type: ActionTypes.GET_PURCHASES_START,
    payload: {
      data: {
        ...formData,
        apiKey,
      },
    },
  };
};

/* ***** *****  Get purchases success  ***** ***** */

export const getPurchasesSuccess = purchases => {
  return {
    type: ActionTypes.GET_PURCHASES_SUCCESS,
    payload: {
      purchases,
    },
  };
};

/* ***** *****  Get purchases failure  ***** ***** */

export const getPurchasesFailure = error => {
  return {
    type: ActionTypes.GET_PURCHASES_FAILURE,
    payload: {
      error,
    },
  };
};
