import * as ActionTypes from 'actionTypes/profileActionTypes';

import { getTranslations } from 'utils/i18n';

/* ***** *****  Set a parent profile  ***** ***** */

export const setProfileParent = profile => {
  return {
    type: ActionTypes.SET_PROFILE_PARENT,
    payload: {
      parent: profile,
    },
  };
};

export const changeProfileChild = profileId => {
  return {
    type: ActionTypes.CHANGE_PROFILE_CHILD,
    payload: {
      profileId,
    },
  };
};

export const editProfileChild = child => {
  return {
    type: ActionTypes.SET_PROFILE_CHILD,
    payload: {
      child,
    },
  };
};

/* ***** *****  Set a child profile  ***** ***** */
export const setProfileChild = profile => {
  return {
    type: ActionTypes.SET_PROFILE_CHILD,
    payload: {
      child: profile,
    },
  };
};

export const setProfileChildAmount = ({ amount, currentAmount }) => {
  return {
    type: ActionTypes.SET_PROFILE_CHILD_AMOUNT,
    payload: {
      amount,
      currentAmount,
    },
  };
};
/* ***** *****  Failure to edit a user profile  ***** ***** */

export const editUserProfileFailure = error => {
  const { message } = error._bodyText ? JSON.parse(error._bodyText) : error;

  return {
    type: ActionTypes.EDIT_USER_PROFILE_FAILURE,
    payload: {
      error: getTranslations(message),
    },
  };
};

/* ***** *****  Edit a user profile  ***** ***** */

export const editUserProfile = data => {
  return {
    type: ActionTypes.EDIT_USER_PROFILE,
    payload: {
      data,
    },
  };
};

/* ***** *****  Edit a user profile  ***** ***** */

export const editChildProfile = data => {
  return {
    type: ActionTypes.EDIT_CHILD_PROFILE,
    payload: {
      data,
    },
  };
};
