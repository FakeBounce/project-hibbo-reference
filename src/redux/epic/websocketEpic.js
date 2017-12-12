import { Observable } from 'rxjs';

import Websocket from 'utils/websocket';

import * as ActionTypes from 'actionTypes/websocketActionTypes';
import { setProfileChildAmount } from 'actions/profileActions';
import { setTransactions } from 'actions/transfertActions';
import { getUnreadNotification } from 'actions/notificationsActions';
import { updateMissionsList } from 'actions/missionActions';
import { websocketError } from 'actions/websocketActions';
import { setPiggyBankAmount } from 'actions/piggyBankActions';
import { setPiggyInfos } from 'actions/appActions';

export const setError = err => Observable.of(websocketError(err));

//
//  Handle getting websocket
//
export const getWebsocketEpic = (action$, { getState }) =>
  action$
    .ofType(ActionTypes.START_WEBSOCKET)
    .mergeMap(() => {
      const {
        user: { token },
        profile: { child: { id: childId }, parent: { id } },
        piggyBank: { currentPiggy: { uuid } },
      } = getState();
      return Websocket.connect(token, [
        {
          url: `/profile/${childId}/transaction`,
          func: data => setTransactions(data.transactions),
        },
        {
          url: `/profile/${childId}/amount`,
          func: setProfileChildAmount,
        },
        {
          url: `/profile/${id}/notification/unread`,
          func: getUnreadNotification,
        },
        {
          url: `/profile/${childId}/mission`,
          func: missions => updateMissionsList(missions),
        },
        {
          url: `/piggybank/${uuid}/amount`,
          func: data => setPiggyBankAmount(data),
        },
        {
          url: `/piggybank/${uuid}/infos`,
          func: data => setPiggyInfos(data),
        },
      ]).catch(setError);
    })
    .map(({ data, func }) => {
      try {
        return func(data);
      } catch (err) {
        return websocketError(new Error('error.server.not.connected'));
      }
    })
    .catch(setError);
