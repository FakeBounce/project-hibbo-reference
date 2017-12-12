import * as ActionTypes from 'actionTypes/appActionTypes';
import { REHYDRATE } from 'redux-persist/constants';

const initialState = {
  rehydrated: false,
  bgSelectorOpen: false,
  background: 0,
  userExist: '',
  ripplePosition: {},
  piggy: {
    trap: 'closed',
    connected: false,
  },
};

const app = (state = initialState, action) => {
  switch (action.type) {
    case REHYDRATE:
      return {
        ...action.payload.app,
        bgSelectorOpen: false,
        rehydrated: !state.rehydrated,
      };
    case ActionTypes.SET_PIGGY_INFOS:
      return {
        ...state,
        piggy: {
          trap: action.payload.trap || state.piggy.trap,
          connected:
            action.payload.connected !== undefined
              ? action.payload.connected
              : state.piggy.connected,
        },
      };
    case ActionTypes.TOGGLE_BG_SELECTOR:
      return {
        ...state,
        bgSelectorOpen: action.payload.value,
      };
    case ActionTypes.SET_BACKGROUND:
      return {
        ...state,
        background: action.payload.value,
      };
    case ActionTypes.SET_USER_EXIST:
      return {
        ...state,
        userExist: action.payload.exist,
      };
    case ActionTypes.CLEAR_USER_EXIST:
      return {
        ...state,
        userExist: '',
      };
    case ActionTypes.SET_ANDROID_RIPPLE:
      return {
        ...state,
        ripplePosition: action.payload.ripplePosition,
      };
    default:
      return state;
  }
};

export default app;
