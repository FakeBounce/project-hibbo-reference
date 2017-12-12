import * as ActionTypes from '../actionTypes/profileActionTypes';

const initialState = {
  error: '',
  parent: {},
  child: {
    amount: 0,
    totalAmount: 0,
  },
};

const profiles = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_PROFILE_CHILD_AMOUNT:
      return {
        ...state,
        error: '',
        child: {
          ...state.child,
          amount: payload.currentAmount,
          totalAmount: payload.amount + state.child.totalAmount,
        },
      };
    case ActionTypes.SET_PROFILE_PARENT:
      return {
        ...state,
        error: '',
        parent: payload.parent,
      };
    case ActionTypes.SET_PROFILE_CHILD:
      return {
        ...state,
        error: '',
        child: payload.child,
      };
    case ActionTypes.EDIT_USER_PROFILE_FAILURE:
      return {
        ...state,
        error: payload.error,
      };
    default:
      return state;
  }
};

export default profiles;
