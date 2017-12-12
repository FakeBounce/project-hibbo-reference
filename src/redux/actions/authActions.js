import { apiKey } from 'utils/api';
import { getTranslations } from 'utils/i18n';
import * as ActionTypes from 'actionTypes/authActionTypes';

/* ***** *****  Login start  ***** ***** */

export const loginStart = formData => {
  return {
    type: ActionTypes.LOGIN_START,
    payload: {
      data: {
        ...formData,
        apiKey,
      },
    },
  };
};

/* ***** *****  Login success  ***** ***** */

export const loginSuccess = data => {
  return {
    type: ActionTypes.LOGIN_SUCCESS,
    payload: {
      token: data.account.token,
      datas: data.account.user,
    },
  };
};

/* ***** *****  Login error  ***** ***** */

export const loginError = error => {
  const { message } = JSON.parse(error._bodyText);

  return {
    type: ActionTypes.LOGIN_ERROR,
    payload: {
      errorMsg: getTranslations(message),
    },
  };
};

/* ***** *****  Register start  ***** ***** */

export const registerStart = formData => {
  return {
    type: ActionTypes.REGISTER_START,
    payload: {
      ...formData,
      apiKey,
    },
  };
};

/* ***** *****  Register error  ***** ***** */

export const registerError = error => {
  const { message } = JSON.parse(error._bodyText);

  return {
    type: ActionTypes.REGISTER_ERROR,
    payload: {
      errorMsg: getTranslations(message),
    },
  };
};

/* ***** *****  Reset pwd start  ***** ***** */

export const resetPwdStart = ({ email }) => {
  return {
    type: ActionTypes.RESET_PWD_START,
    payload: {
      email,
    },
  };
};

/* ***** *****  Reset pwd success  ***** ***** */

export const resetPwdSuccess = resetPwd => {
  return {
    type: ActionTypes.RESET_PWD_SUCCESS,
    payload: {
      resetPwd,
    },
  };
};

/* ***** *****  Reset pwd error  ***** ***** */

export const resetPwdError = error => {
  const { message } = JSON.parse(error._bodyText);

  return {
    type: ActionTypes.RESET_PWD_ERROR,
    payload: {
      errorMsg: getTranslations(message),
    },
  };
};

/* ***** *****  Reset pwd start  ***** ***** */

export const resetCodeStart = ({ email, token }) => {
  return {
    type: ActionTypes.RESET_CODE_START,
    payload: {
      email,
      token,
    },
  };
};

/* ***** *****  Reset Code Error  ***** ***** */

export const resetError = error => {
  return {
    type: ActionTypes.RESET_ERROR,
    payload: {
      errorMsg: error,
    },
  };
};

/* ***** *****  Reset pwd start  ***** ***** */

export const changePwdStart = ({ email, token, password }) => {
  return {
    type: ActionTypes.CHANGE_PWD_START,
    payload: {
      email,
      password,
      token,
    },
  };
};

/* ***** *****  Register with Google error  ***** ***** */

export const registerWithGoogleError = error => {
  let errorMsg = '';

  if (error.status === 409) {
    errorMsg = getTranslations('error.account.alreadyexists');
  } else if (error.code === -5) {
    errorMsg = getTranslations('error.auth.google.cancel');
  } else {
    errorMsg = getTranslations('error.auth.google');
  }

  return {
    type: ActionTypes.GOOGLE_REGISTER_ERROR,
    payload: {
      errorMsg,
    },
  };
};

/* ***** *****  Login with Google error  ***** ***** */

export const loginWithGoogleError = error => {
  let errorMsg = '';

  if (error.code === -5) {
    errorMsg = getTranslations('error.auth.google.cancel');
  } else if (error) {
    errorMsg = getTranslations('error.auth.google');
  }

  return {
    type: ActionTypes.GOOGLE_LOGIN_ERROR,
    payload: {
      errorMsg,
    },
  };
};

/* ***** *****  Register with Fb error  ***** ***** */

export const registerWithFbError = error => {
  let errorMsg = '';

  if (error.status === 409) {
    errorMsg = getTranslations('error.account.alreadyexists');
  } else {
    errorMsg = getTranslations('error.auth.fb');
  }

  return {
    type: ActionTypes.FB_REGISTER_ERROR,
    payload: {
      errorMsg,
    },
  };
};

/* ***** *****  Login with Fb error  ***** ***** */

export const loginWithFbError = error => {
  let errorMsg = '';

  if (error) {
    errorMsg = getTranslations('error.auth.fb');
  }

  return {
    type: ActionTypes.FB_LOGIN_ERROR,
    payload: {
      errorMsg,
    },
  };
};

/* ***** *****  Reset all erros  ***** ***** */

export const resetAllErrors = () => {
  return {
    type: ActionTypes.RESET_ALL_ERRORS,
  };
};
