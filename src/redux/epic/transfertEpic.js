import { Observable } from 'rxjs';

import {
  transfertError,
  setTransactions,
  transfertSuccess,
} from 'actions/transfertActions';
import { getEpic, postEpic, debounceTime } from 'utils/api';

import * as ActionTypes from 'actionTypes/transfertActionTypes';

//
//  Initialize transaction
//
export const initializeTransactions = action$ =>
  action$
    .ofType(ActionTypes.TRANSFERT_INITIALIZE)
    .debounceTime(debounceTime)
    .switchMap(({ payload: { profileId, token, accountId } }) => {
      return getEpic(`profile/${profileId}/transaction`, token, accountId)
        .map(transactions => setTransactions(transactions))
        .catch(error => Observable.of(transfertError(error)));
    });

//
//  Handle payin
//
export const sendPayInToServerEpic = action$ =>
  action$
    .ofType(ActionTypes.SEND_PAYIN_TO_SERVER)
    .debounceTime(debounceTime)
    .switchMap(({ payload: { data, actionType } }) => {
      const postBody = data;
      let { amount } = data;

      // Temporary fix. Amount should be a float value.
      amount = amount.replace(',', '.');
      amount = parseFloat(amount) * 100;
      postBody.amount = amount;
      return postEpic(`stripepay/${actionType}`, postBody)
        .map(() => {
          return transfertSuccess();
        })
        .catch(error => Observable.of(transfertError(error)));
    });
