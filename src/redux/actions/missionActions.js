import { getTranslations } from 'utils/i18n';
import * as ActionTypes from 'actionTypes/missionActionTypes';
import { SET_ERROR } from 'actionTypes/notificationsActionTypes';

/* ***** *****  Mission success  ***** ***** */

export const missionSuccess = () => {
  return {
    type: ActionTypes.MISSION_SUCCESS,
  };
};

export const isTransfering = () => {
  return {
    type: ActionTypes.IS_TRANSFERING,
  };
};

export const missionCompleted = (msg = '') => {
  return {
    type: ActionTypes.SET_MISSION_SUCCESS,
    payload: {
      successMsg: getTranslations(msg),
    },
  };
};

export const getMissionsList = (profileId, token, accountId) => {
  return {
    type: ActionTypes.GET_MISSIONS_LIST,
    payload: {
      profileId,
      token,
      accountId,
    },
  };
};

export const updateMissionsList = missions => {
  return {
    type: ActionTypes.UPDATE_MISSION_LIST,
    payload: {
      missions,
    },
  };
};

export const addMissionToProfile = formData => {
  return {
    type: ActionTypes.ADD_MISSION_TO_PROFILE,
    payload: {
      formData,
    },
  };
};

export const doneMissionToProfile = missionId => {
  return {
    type: ActionTypes.DONE_MISSION_TO_PROFILE,
    payload: {
      missionId,
    },
  };
};

export const deleteMissionFromProfile = missionId => {
  return {
    type: ActionTypes.DELETE_MISSION_FROM_PROFILE,
    payload: {
      missionId,
    },
  };
};

export const editMissionFromProfile = formData => {
  return {
    type: ActionTypes.EDIT_MISSION_FROM_PROFILE,
    payload: {
      formData,
    },
  };
};

/* ***** *****  Mission error  ***** ***** */

export const missionError = error => {
  const { message } = error._bodyText ? JSON.parse(error._bodyText) : error;

  console.log('ERROR GOT IN MISSION', error);
  return {
    type: SET_ERROR,
    payload: {
      errorMsg: getTranslations(message),
    },
  };
};
