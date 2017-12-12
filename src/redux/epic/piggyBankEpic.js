import { postEpic, debounceTime } from 'utils/api';
import { Observable } from 'rxjs';

import * as ActionTypes from 'actionTypes/piggyBankActionTypes';
import {
  setPiggyBank,
  setPiggyBankFailure,
  initPiggyBanks as initPiggyBanksAction,
} from 'actions/piggyBankActions';
import { setProfileChild } from 'actions/profileActions';
import { setPaymentMeansChild } from 'actions/paymentMeansActions';

//
//  Init a new piggy bank
//
export const initPiggyBanks = action$ =>
  action$
    .ofType(ActionTypes.INIT_PIGGY_BANK)
    .mergeMap(({ payload: { data } }) =>
      Observable.create(observer => {
        let { childProfile, parentProfile, ...piggyBanks } = data;
        if (!childProfile) {
          childProfile = data;
          piggyBanks = data.piggyBanks[0]; // eslint-disable-line
          parentProfile = null;
        }

        const {
          missions,
          moneypots,
          notifications,
          paymentMeans,
          eshopPurchases,
          account,
          ...child
        } = childProfile;

        observer.next(setPiggyBank(piggyBanks));
        observer.next(setProfileChild(child));
        observer.next(setPaymentMeansChild(paymentMeans));
      }),
    );

//
//  Save a new piggy bank
//
export const createPiggyBank = (action$, { getState }) =>
  action$
    .ofType(ActionTypes.CREATE_PIGGY_BANK)
    .debounceTime(debounceTime)
    .switchMap(({ payload: { data } }) =>
      postEpic('piggybank', {
        ...data,
        profileParentId: getState().profile.parent.id,
      })
        .map(piggys => initPiggyBanksAction(piggys))
        .catch(error => Observable.of(setPiggyBankFailure(error))),
    )
    .catch(error => Observable.of(setPiggyBankFailure(error)));
