import { getTranslations } from 'utils/i18n';
import * as ActionTypes from 'actionTypes/userActionTypes';

/* ***** *****  Create user  ***** ***** */

export const createProfileStart = formData => {
  return {
    type: ActionTypes.START_EDIT_USER,
    payload: {
      ...formData,
    },
  };
};

/* ***** *****  Edit user  ***** ***** */

export const editUserStart = formData => {
  return {
    type: ActionTypes.START_EDIT_USER,
    payload: {
      ...formData,
    },
  };
};

/* ***** *****  Set user datas success  ***** ***** */

export const setUserDatasSuccess = data => {
  return {
    type: ActionTypes.SET_USER_DATAS_SUCCESS,
    payload: {
      data,
    },
  };
};

/* ***** *****  Set user datas error  ***** ***** */

export const setUserDatasError = () => {
  return {
    type: ActionTypes.SET_USER_DATAS_FAILURE,
    payload: {
      errorMsg: getTranslations('error.generic'),
    },
  };
};

/* ***** *****  Save patial user register  ***** ***** */

export const savePartialRegister = formData => {
  return {
    type: ActionTypes.SAVE_PARTIAL_REGISTER,
    payload: {
      formData,
    },
  };
};
