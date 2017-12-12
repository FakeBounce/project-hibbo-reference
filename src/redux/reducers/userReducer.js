import * as ActionTypes from 'actionTypes/authActionTypes';
import {
  REFRESH_TOKEN,
  SAVE_PARTIAL_REGISTER,
} from 'actionTypes/userActionTypes';
import {
  CHECK_USER_EXIST,
  SET_USER_EXIST,
  CLEAR_USER_EXIST,
} from 'actionTypes/appActionTypes';

const initialState = {
  error: '',
  fbError: '',
  googleError: '',
  token: '',
  userDatas: {
    email: '',
    password: '',
  },
  logginIn: false,
  resetPwd: '',
  partialRegister: {},
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case CLEAR_USER_EXIST:
    case SET_USER_EXIST:
      return {
        ...state,
        logginIn: false,
      };
    case REFRESH_TOKEN:
      return {
        ...state,
        token: action.payload.token,
      };
    case ActionTypes.LOGIN_START:
    case ActionTypes.REGISTER_START:
    case CHECK_USER_EXIST:
      return {
        ...state,
        logginIn: true,
      };
    case ActionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        token: action.payload.token,
        userDatas: action.payload.datas,
        error: '',
        fbError: '',
        googleError: '',
        logginIn: false,
        partialRegister: {},
      };
    case ActionTypes.LOGIN_ERROR:
      return {
        ...state,
        error: action.payload.errorMsg,
        fbError: '',
        googleError: '',
        logginIn: false,
      };
    case ActionTypes.REGISTER_ERROR:
      return {
        ...state,
        error: action.payload.errorMsg,
        fbError: '',
        googleError: '',
        logginIn: false,
      };
    case ActionTypes.RESET_PWD_ERROR:
      return {
        ...state,
        error: action.payload.errorMsg,
        fbError: '',
        googleError: '',
        resetPwd: '',
      };
    case ActionTypes.GOOGLE_LOGIN_ERROR:
      return {
        ...state,
        googleError: action.payload.errorMsg,
        error: '',
        fbError: '',
        logginIn: false,
      };
    case ActionTypes.GOOGLE_REGISTER_ERROR:
      return {
        ...state,
        googleError: action.payload.errorMsg,
        error: '',
        fbError: '',
        logginIn: false,
      };

    case ActionTypes.FB_LOGIN_ERROR:
      return {
        ...state,
        fbError: action.payload.errorMsg,
        googleError: '',
        error: '',
        logginIn: false,
      };
    case ActionTypes.FB_REGISTER_ERROR:
      return {
        ...state,
        fbError: action.payload.errorMsg,
        googleError: '',
        error: '',
        logginIn: false,
      };

    case ActionTypes.RESET_ALL_ERRORS:
      return {
        ...state,
        fbError: '',
        googleError: '',
        error: '',
      };
    case ActionTypes.RESET_PWD_SUCCESS:
      return {
        ...state,
        error: '',
        resetPwd: action.payload.resetPwd,
      };
    case ActionTypes.RESET_ERROR:
      return {
        ...state,
        error: action.payload.errorMsg,
        resetPwd: '',
      };

    case SAVE_PARTIAL_REGISTER:
      return {
        ...state,
        partialRegister: action.payload.formData,
      };
    default:
      return state;
  }
};

export default user;
