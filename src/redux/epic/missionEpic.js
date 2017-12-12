import { delEpic, getEpic, postEpic, putEpic } from 'utils/api';
import { Observable } from 'rxjs';
import {
  updateMissionsList,
  missionError,
  missionSuccess,
  missionCompleted,
} from 'actions/missionActions';
import * as ActionTypes from 'actionTypes/missionActionTypes';

export const addMission = action$ =>
  action$
    .ofType(ActionTypes.ADD_MISSION_TO_PROFILE)
    .mergeMap(({ payload: { formData } }) => {
      return postEpic(`mission`, formData)
        .map(missionSuccess)
        .catch(error => Observable.of(missionError(error)));
    });

export const completeMission = (action$, { getState }) =>
  action$
    .ofType(ActionTypes.DONE_MISSION_TO_PROFILE)
    .mergeMap(({ payload: { missionId } }) => {
      const { user: { token }, paymentMeans, piggyBank } = getState();
      const formData = {
        id: missionId,
        cardId: paymentMeans.cardId,
        walletId: piggyBank.currentPiggy.walletId.toString(),
      };
      return putEpic(`mission/done`, formData, token)
        .map(() => {
          return missionCompleted('mission.complete.message');
        })
        .catch(error => Observable.of(missionError(error)));
    });

export const deleteMission = action$ =>
  action$
    .ofType(ActionTypes.DELETE_MISSION_FROM_PROFILE)
    .mergeMap(({ payload: { missionId } }) => {
      return delEpic(`mission/${missionId}`)
        .map(missionSuccess)
        .catch(error => Observable.of(missionError(error)));
    });

export const editMission = action$ =>
  action$
    .ofType(ActionTypes.EDIT_MISSION_FROM_PROFILE)
    .mergeMap(({ payload: { formData } }) => {
      return putEpic(`mission`, formData)
        .map(missionSuccess)
        .catch(error => Observable.of(missionError(error)));
    });

export const missionList = action$ =>
  action$
    .ofType(ActionTypes.GET_MISSIONS_LIST)
    .mergeMap(({ payload: { profileId, token, accountId } }) =>
      getEpic(`profile/${profileId}/mission`, token, accountId)
        .map(missions => updateMissionsList({ missions }))
        .catch(error => Observable.of(missionError(error))),
    );
