import { Observable } from 'rxjs';
import stripe from 'tipsi-stripe';

import {
  setPaymentMeanError,
  createPayUserError,
} from 'actions/paymentMeansActions';
import { setProfileParent } from 'actions/profileActions';

import { postEpic, debounceTime } from 'utils/api';

import * as ActionTypes from 'actionTypes/paymentMeansActionTypes';

//
//  Register a new card
//
export const registerCard = (action$, { getState }) =>
  action$
    .ofType(ActionTypes.SAVE_CARD)
    .debounceTime(debounceTime)
    .switchMap(
      ({
        payload: {
          cardData: { cardNumber, name, crypto, month, year, currency },
        },
      }) => {
        const { profile: { parent: { id, homeAddress } } } = getState();
        let address = {};

        if (homeAddress) {
          address = {
            addressLine1: homeAddress.line1,
            addressLine2: homeAddress.line2,
            addressCity: homeAddress.city,
            addressState: homeAddress.region,
            addressCountry: homeAddress.country,
            addressZip: homeAddress.postalCode,
          };
        }
        const cardData = {
          number: cardNumber,
          expMonth: parseInt(month, 10),
          expYear: parseInt(year, 10),
          cvc: crypto,
          // optional
          name,
          currency,
          ...address,
        };

        return Observable.fromPromise(stripe.createTokenWithCard(cardData))
          .mergeMap(token =>
            postEpic('stripepay/card', {
              cardId: token.tokenId,
              profileId: id,
            })
              .map(res => setProfileParent(res))
              .catch(error => Observable.of(setPaymentMeanError(error))),
          )
          .catch(error => Observable.of(setPaymentMeanError(error)));
      },
    )
    .catch(error => Observable.of(setPaymentMeanError(error)));

//
//  Create a pay user
//
export const createPayUser = (action$, { getState }) =>
  action$
    .ofType(ActionTypes.CREATE_PAY_USER)
    .debounceTime(debounceTime)
    .switchMap(() => {
      const { profile: { parent: { id } } } = getState();

      return postEpic('stripepay/user', {
        profileId: id,
      })
        .map(res => setProfileParent(res))
        .catch(error => Observable.of(createPayUserError(error)));
    })
    .catch(error => Observable.of(createPayUserError(error)));

//
//  Create a bank account
//
export const createBankAccount = (action$, { getState }) =>
  action$
    .ofType(ActionTypes.SAVE_BANK_ACCOUNT)
    .debounceTime(debounceTime)
    .switchMap(({ payload: { bankData } }) => {
      const { profile: { parent: { id }, child } } = getState();

      return Observable.fromPromise(
        stripe.createTokenWithBankAccount(bankData),
      ).mergeMap(bankAccount =>
        postEpic('stripepay/bank', {
          profileParentId: id,
          profileToAddBankId: child.id,
          bankAccountId: bankAccount.tokenId,
        })
          .map(res => setProfileParent(res))
          .catch(error => Observable.of(setPaymentMeanError(error))),
      );
    })
    .catch(error => Observable.of(setPaymentMeanError(error)));
