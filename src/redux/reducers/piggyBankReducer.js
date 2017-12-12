import * as ActionTypes from 'actionTypes/piggyBankActionTypes';

const initialState = {
  error: '',
  currentPiggy: {},
};

const piggyBank = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_PIGGY_BANK_AMOUNT:
      return {
        ...state,
        currentPiggy: {
          ...state.currentPiggy,
          amount: payload.amount,
        },
      };
    case ActionTypes.SET_PIGGY_BANK_FAILURE:
      return {
        ...state,
        error: payload.error,
      };
    case ActionTypes.SET_PIGGY_BANK:
      return {
        ...state,
        currentPiggy: payload.piggybank,
      };
    default:
      return state;
  }
};

export default piggyBank;
