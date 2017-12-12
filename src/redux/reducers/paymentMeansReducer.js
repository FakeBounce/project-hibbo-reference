import * as ActionTypes from 'actionTypes/paymentMeansActionTypes';

const initialState = {
  error: '',
  cardId: '',
  bankAccount: {},
  parent: {
    card: [],
    bank: [],
    wallet: [],
  },
  child: {
    card: [],
    bank: [],
    wallet: [],
  },
};

const paymentMeans = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SET_PAYMENTMEANS_DATA_PARENT:
      return {
        ...state,
        parent: {
          ...action.payload,
        },
      };
    case ActionTypes.SET_PAYMENTMEANS_DATA_CHILD:
      return {
        ...state,
        child: {
          ...action.payload,
        },
      };
    case ActionTypes.SET_CARD_ID:
      return {
        ...state,
        cardId: action.payload.cardId,
      };
    case ActionTypes.SET_SELECTED_BANK_ACCOUNT:
      return {
        ...state,
        bankAccount: action.payload.bankAccount,
      };
    case ActionTypes.SAVE_CARD_ERROR:
      return {
        ...state,
        cardId: '',
        error: action.payload.error,
      };
    case ActionTypes.CLEAR_CARD_ERROR:
      return {
        ...state,
        error: '',
      };
    default:
      return state;
  }
};

export default paymentMeans;
