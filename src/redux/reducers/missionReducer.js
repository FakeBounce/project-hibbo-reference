import * as ActionTypes from 'actionTypes/missionActionTypes';

const initialState = {
  missions: [],
  error: '',
  success: '',
  isTransfering: false,
};

const missions = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.UPDATE_MISSION_LIST:
      return {
        ...state,
        missions: action.payload.missions.missions,
      };
    case ActionTypes.SET_MISSION_SUCCESS:
      return {
        ...state,
        success: action.payload.successMsg,
        isTransfering: false,
      };
    case ActionTypes.IS_TRANSFERING:
      return {
        ...state,
        isTransfering: !state.isTransfering,
      };
    default:
      return state;
  }
};

export default missions;
