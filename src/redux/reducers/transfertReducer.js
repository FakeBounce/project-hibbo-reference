import * as ActionTypes from '../actionTypes/transfertActionTypes';

const initialState = {
  transactions: [],
};

const transfert = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_TRANSACTIONS:
      return {
        ...state,
        transactions: payload.transactions,
      };
    default:
      return state;
  }
};

export default transfert;
