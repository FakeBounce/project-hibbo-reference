import * as ActionTypes from 'actionTypes/pairingActionTypes';

const initialState = {
  picture: '',
};

const pairing = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SAVE_USER_PICTURE:
      return {
        ...state,
        picture: payload.img,
      };
    case ActionTypes.CLEAR_USER_PICTURE:
      return {
        ...state,
        picture: '',
      };
    default:
      return state;
  }
};

export default pairing;
