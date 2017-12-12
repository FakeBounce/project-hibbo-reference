import { putEpic, getEpic, debounceTime } from 'utils/api';
import { resetNotification, setError } from 'actions/notificationsActions';
import * as ActionTypes from 'actionTypes/notificationsActionTypes';
import { Observable } from 'rxjs';

//
//  Handle readNotification
//
export const readNotification = action$ =>
  action$
    .ofType(ActionTypes.SET_NOTIFICATION_TO_READ)
    .debounceTime(debounceTime)
    .switchMap(({ payload: { profileId } }) =>
      putEpic('notification/read', { profileId })
        .map(notifications =>
          resetNotification({ unread: [], read: notifications }),
        )
        .catch(error => {
          console.log(
            'An error occured while getting unread notification',
            error,
          );
          return Observable.of(setError(error));
        }),
    )
    .catch(error => {
      console.log('An error occured while getting unread notification', error);
      return Observable.of(setError(error));
    });

export const getNotifications = action$ =>
  action$
    .ofType(ActionTypes.GET_NOTIFICATION)
    .debounceTime(debounceTime)
    .switchMap(({ payload: { profileId, token, accountId } }) =>
      getEpic(`profile/${profileId}/notification/all`, token, accountId)
        .map(notifications => resetNotification(notifications))
        .catch(error => {
          console.log('An error occured while getting notification', error);
          return Observable.of(setError(error));
        }),
    )
    .catch(error => {
      console.log('An error occured while getting notification', error);
      return Observable.of(setError(error));
    });
