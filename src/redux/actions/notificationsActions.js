import { getTranslations } from 'utils/i18n';
import * as ActionTypes from 'actionTypes/notificationsActionTypes';

export const setError = errorMsg => {
  const { message } = errorMsg._bodyText
    ? JSON.parse(errorMsg._bodyText)
    : errorMsg;

  return {
    type: ActionTypes.SET_ERROR,
    payload: {
      errorMsg: message ? getTranslations(message) : errorMsg,
    },
  };
};

export const getNotifications = (profileId, token, accountId) => {
  return {
    type: ActionTypes.GET_NOTIFICATION,
    payload: {
      profileId,
      token,
      accountId,
    },
  };
};

export const resetNotification = notifications => {
  return {
    type: ActionTypes.RESET_NOTIFICATION_SUCCESS,
    payload: {
      ...notifications,
    },
  };
};

export const getUnreadNotification = unreadNotifications => {
  return {
    type: ActionTypes.GET_UNREAD_NOTIFICATION,
    payload: {
      unread: unreadNotifications,
    },
  };
};

export const setNotificationToRead = (profileId, token) => {
  return {
    type: ActionTypes.SET_NOTIFICATION_TO_READ,
    payload: {
      profileId,
      token,
    },
  };
};
