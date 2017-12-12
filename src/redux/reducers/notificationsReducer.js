import * as ActionTypes from 'actionTypes/notificationsActionTypes';

const initialState = {
  unread: [],
  read: [],
  error: '',
};

const notifications = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_UNREAD_NOTIFICATION:
      return {
        ...state,
        unread: action.payload.unread,
      };
    case ActionTypes.RESET_NOTIFICATION_SUCCESS:
      return {
        ...state,
        unread: action.payload.unread,
        read: action.payload.read,
      };
    case ActionTypes.SET_ERROR:
      return {
        ...state,
        error: action.payload.errorMsg,
      };
    default:
      return state;
  }
};

export default notifications;
