import * as ActionTypes from '../actionTypes/navigationActionTypes';

export const goTo = (navigation, route, params) => {
  navigation.navigate(route, params);

  return {
    type: ActionTypes.GOTO,
    ...params,
  };
};

export const setParam = params => {
  return {
    type: ActionTypes.GOTO,
    ...params,
  };
};
