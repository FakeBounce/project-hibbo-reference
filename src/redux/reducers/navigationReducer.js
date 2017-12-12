import * as ActionTypes from '../actionTypes/navigationActionTypes';

const initialState = {
  tab: 0,
};

const navigation = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GOTO:
      return {
        ...state,
        tab: action.tab,
      };
    default:
      return state;
  }
};

export default navigation;
