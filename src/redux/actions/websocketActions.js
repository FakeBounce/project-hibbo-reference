import * as ActionTypes from 'actionTypes/websocketActionTypes';
import { SET_ERROR } from 'actionTypes/notificationsActionTypes';

import { getTranslations } from 'utils/i18n';

/* ***** *****  websocket error  ***** ***** */

export const websocketError = error => {
  const { message } = error._bodyText ? JSON.parse(error._bodyText) : error;

  console.log('ERROR GOT IN websocket', message);
  return {
    type: SET_ERROR,
    payload: {
      errorMsg: getTranslations(message),
    },
  };
};

export const startWebsocket = () => {
  return {
    type: ActionTypes.START_WEBSOCKET,
  };
};
