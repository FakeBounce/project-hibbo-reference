import { getEpic, debounceTime } from 'utils/api';
import { Observable } from 'rxjs';

import * as ActionTypes from 'actionTypes/settingsActionTypes';
import {
  getProfilesSuccess,
  getProfilesFailure,
  getPaymentMeansSuccess,
  getPaymentMeansFailure,
  getPurchasesSuccess,
  getPurchasesFailure,
} from 'actions/settingsActions';

//
//  Get profiles
//
export const getProfilesEpic = (action$, { getState }) =>
  action$
    .ofType(ActionTypes.GET_PROFILES_START)
    .debounceTime(debounceTime)
    .switchMap(() => {
      const { userDatas: { id } } = getState().user;
      return getEpic(`accounts/${id}/profiles`)
        .map(profilesDatas => getProfilesSuccess(profilesDatas))
        .catch(error => Observable.of(getProfilesFailure(error)));
    });

//
//  Get payment means
//

export const getPaymentMeans = action$ =>
  action$
    .ofType(ActionTypes.GET_PAYMENT_MEANS_START)
    .debounceTime(debounceTime)
    .switchMap(() =>
      getEpic('paymentMeans')
        .map(profilesDatas => getPaymentMeansSuccess(profilesDatas))
        .catch(error => Observable.of(getPaymentMeansFailure(error))),
    );

//
//  Get purchases
//
export const getPurchases = (action$, { getState }) =>
  action$
    .ofType(ActionTypes.GET_PAYMENT_MEANS_START)
    .debounceTime(debounceTime)
    .switchMap(() => {
      const { profile: { parent: { id } } } = getState();
      return getEpic(`profile/${id}/eshopPurchase`)
        .map(profilesDatas => getPurchasesSuccess(profilesDatas))
        .catch(error => Observable.of(getPurchasesFailure(error)));
    });
