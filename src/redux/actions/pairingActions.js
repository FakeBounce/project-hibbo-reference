import * as ActionTypes from 'actionTypes/pairingActionTypes';

/* ***** *****  Check user exist  ***** ***** */

export const selectUserPicture = picture => {
  return {
    type: ActionTypes.SELECT_USER_PICTURE,
    payload: {
      picture,
    },
  };
};

export const setUserPicture = ({ img }) => {
  return {
    type: ActionTypes.SAVE_USER_PICTURE,
    payload: {
      img,
    },
  };
};

export const clearUserPicture = () => {
  return {
    type: ActionTypes.CLEAR_USER_PICTURE,
  };
};
