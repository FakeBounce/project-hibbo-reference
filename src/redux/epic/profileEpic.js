import { putEpic, getEpic, debounceTime } from 'utils/api';
import { Observable } from 'rxjs';

import * as ActionTypes from 'actionTypes/profileActionTypes';
import { setError, getNotifications } from 'actions/notificationsActions';
import {
  setProfileParent,
  setProfileChild,
  editUserProfileFailure,
  editProfileChild,
} from 'actions/profileActions';
import { setPaymentMeansParent } from 'actions/paymentMeansActions';
import { initializeTransactions } from 'actions/transfertActions';
import { initPiggyBanks } from 'actions/piggyBankActions';
import { loginSuccess } from 'actions/authActions';
import { getMissionsList } from 'actions/missionActions';

const setChildStuff = (piggyBanks, account) =>
  getEpic(
    `profile/${piggyBanks[0].childProfileId}`,
    account.token,
    account.user.id,
  ).map(bank => initPiggyBanks(bank));

//
//  Set user profile
//
export const setProfileParentEpic = (action$, { getState }) =>
  action$
    .ofType(ActionTypes.SET_PROFILE_PARENT)
    .mergeMap(({ payload: { parent: profile } }) =>
      Observable.create(observer => {
        try {
          const { piggyBanks, paymentMeans, account, id } = profile;
          const userState = getState().user;
          let trueAccount = account;
          const userProfile = profile;
          if (!account.token && userState.token) {
            trueAccount = {
              token: userState.token,
              user: account,
            };
            userProfile.account = trueAccount;
          }
          const { user, token } = trueAccount;
          if (piggyBanks && piggyBanks.length > 0) {
            observer.next(
              initializeTransactions(
                piggyBanks[0].childProfileId,
                token,
                user.id,
              ),
            );
            observer.next(
              getMissionsList(piggyBanks[0].childProfileId, token, user.id),
            );
            setChildStuff(piggyBanks, trueAccount).subscribe(
              state => {
                observer.next(state);
                observer.next(loginSuccess(userProfile));
              },
              error => observer.error(error),
            );
          } else {
            observer.next(loginSuccess(userProfile));
          }
          observer.next(getNotifications(id, token, user.id));
          observer.next(setPaymentMeansParent(paymentMeans));
        } catch (err) {
          observer.error(err);
        }
        return null;
      }),
    )
    .catch(error => Observable.of(setError(error)));

//
//  Edit user profile
//
export const editUserProfile = (action$, { getState }) =>
  action$
    .ofType(ActionTypes.EDIT_USER_PROFILE)
    .debounceTime(debounceTime)
    .switchMap(({ payload: { data } }) => {
      const { profile: { parent: { id } } } = getState();
      const formdata = {
        ...data,
        id,
      };
      return putEpic(`profile`, formdata)
        .map(user => setProfileParent(user))
        .catch(error => Observable.of(editUserProfileFailure(error)));
    })
    .catch(error => Observable.of(editUserProfileFailure(error)));

//
//  Edit user profile
//
export const editChildProfile = (action$, { getState }) =>
  action$
    .ofType(ActionTypes.EDIT_CHILD_PROFILE)
    .debounceTime(debounceTime)
    .switchMap(({ payload: { data } }) => {
      const { profile: { child: { id } } } = getState();
      const formdata = {
        ...data,
        id,
      };
      return putEpic(`profile`, formdata)
        .map(user => setProfileChild(user))
        .catch(error => Observable.of(editUserProfileFailure(error)));
    })
    .catch(error => Observable.of(editUserProfileFailure(error)));

//  Change child profile
//
export const changeChildProfile = action$ =>
  action$
    .ofType(ActionTypes.CHANGE_PROFILE_CHILD)
    .debounceTime(debounceTime)
    .switchMap(({ payload: { profileId } }) =>
      getEpic(`profile/${profileId}`)
        .map(user => editProfileChild(user))
        .catch(error => Observable.of(editUserProfileFailure(error))),
    )
    .catch(error => {
      console.log('An error occured while switching piggybanks', error);
      return Observable.of(editUserProfileFailure(error));
    });
