import { Observable } from 'rxjs';
import Config from 'react-native-config';
import {
  LoginManager,
  AccessToken,
  GraphRequest,
  GraphRequestManager,
} from 'react-native-fbsdk';
import ImageResizer from 'react-native-image-resizer'; // eslint-disable-line

import { GoogleSignin } from 'react-native-google-signin';
import { postEpic, getEpic, apiKey, debounceTime } from 'utils/api';
import { getLanguage } from 'utils/i18n';
import {
  registerError,
  loginError,
  resetPwdSuccess,
  resetPwdError,
  resetError,
  registerWithGoogleError,
  loginWithGoogleError,
  registerWithFbError,
  loginWithFbError,
} from 'actions/authActions';
import {
  setProfileParent,
  editUserProfile,
  editUserProfileFailure,
} from 'actions/profileActions';
import { setUserExist, clearUserExist } from 'actions/appActions';

import { imageDownloader, convertToBase64 } from 'utils/imageManipulation';

import * as ActionTypes from 'actionTypes/authActionTypes';
import * as AppActionTypes from 'actionTypes/appActionTypes';

export const userLoggged = user =>
  Observable.create(observer => {
    const { moneypots, eshopPurchases, ...profile } = user;
    observer.next(setProfileParent(profile));
  });

//
//  Download social image and convert to base 64
//
export const downloadAndConvert = img =>
  Observable.fromPromise(imageDownloader(img))
    .mergeMap(photo =>
      Observable.fromPromise(
        ImageResizer.createResizedImage(photo, 250, 250, 'JPEG', 90),
      )
        .mergeMap(resizedImageUri =>
          Observable.fromPromise(convertToBase64(resizedImageUri.uri)),
        )
        .map(base64Img => editUserProfile({ avatar: base64Img })),
    )
    .catch(error => Observable.of(editUserProfileFailure(error)));

//
//  Handle login
//
export const logUser = action$ =>
  action$
    .ofType(ActionTypes.LOGIN_START)
    .debounceTime(debounceTime)
    .switchMap(({ payload: { data } }) =>
      postEpic('accounts/login', data)
        .mergeMap(user => userLoggged(user))
        .catch(error => Observable.of(loginError(error))),
    )
    .catch(error => Observable.of(loginError(error)));

//
//  Handle registration
//
export const registerUser = action$ =>
  action$
    .ofType(ActionTypes.REGISTER_START)
    .debounceTime(debounceTime)
    .switchMap(({ payload }) =>
      postEpic('accounts/register', {
        ...payload,
        apiKey: payload.apiKey,
        nickname: payload.firstname,
        securityCode: '0',
        phone: '0',
      })
        .mergeMap(user => userLoggged(user))
        .catch(error => Observable.of(registerError(error))),
    )
    .catch(error => Observable.of(registerError(error)));

//
//  Handle reset password
//
export const resetPassword = action$ =>
  action$
    .ofType(ActionTypes.RESET_PWD_START)
    .debounceTime(debounceTime)
    .switchMap(({ payload }) =>
      postEpic('accounts/password/forgot', {
        ...payload,
        apiKey,
      })
        .map(() => resetPwdSuccess('mailCorrect'))
        .catch(error => Observable.of(resetPwdError(error))),
    )
    .catch(error => Observable.of(resetPwdError(error)));

export const resetCheckCode = action$ =>
  action$
    .ofType(ActionTypes.RESET_CODE_START)
    .debounceTime(debounceTime)
    .switchMap(({ payload }) =>
      postEpic('accounts/password/reset/token', {
        ...payload,
      })
        .map(res => {
          if (!res.success) {
            return resetError(res.error);
          }
          return resetPwdSuccess('codeCorrect');
        })
        .catch(error => Observable.of(resetError(error))),
    )
    .catch(error => Observable.of(resetError(error)));

export const changePassword = action$ =>
  action$
    .ofType(ActionTypes.CHANGE_PWD_START)
    .debounceTime(debounceTime)
    .switchMap(({ payload }) =>
      postEpic('accounts/password/reset', {
        ...payload,
      })
        .map(res => {
          if (!res.success) {
            return resetError(res.error);
          }
          return resetPwdSuccess('editUserDone');
        })
        .catch(error => Observable.of(resetError(error))),
    )
    .catch(error => Observable.of(resetError(error)));

//
//  Handle Google calls
//
const googleSignin = () =>
  Observable.fromPromise(
    GoogleSignin.configure({
      iosClientId: Config.googleIosClientId,
      webClientId: Config.googleWebClientId,
      offline: false,
    }),
  ).mergeMap(() => Observable.fromPromise(GoogleSignin.signIn()));

const createPhotoAndLogIn = (userLogin, avatar) => {
  return Observable.create(observer => {
    downloadAndConvert(avatar).subscribe(
      state => observer.next(state),
      error => observer.error(error),
    );
    userLoggged(userLogin).subscribe(
      state => observer.next(state),
      error => observer.error(error),
    );
  });
};

//
//  Handle google register
//
export const registerWithGoogle = action$ =>
  action$
    .ofType(ActionTypes.GOOGLE_REGISTER_START)
    .debounceTime(debounceTime)
    .switchMap(() =>
      googleSignin()
        .mergeMap(user =>
          postEpic('accounts/register', {
            email: user.email,
            nickname: user.name,
            providerId: user.email,
            firstname: user.givenName,
            lastname: user.familyName,
            apiKey,
            provider: 'google',
            accessToken: user.idToken,
            language: getLanguage(),
            avatar: user.photo,
            securityCode: '0',
            phone: '0',
          })
            .mergeMap(userLogin => createPhotoAndLogIn(userLogin, user.photo))
            .catch(error => Observable.of(registerWithGoogleError(error))),
        )
        .catch(error => Observable.of(registerWithGoogleError(error))),
    )
    .catch(error => Observable.of(registerWithGoogleError(error)));

//
//  Handle google login
//
export const loginWithGoogle = action$ =>
  action$
    .ofType(ActionTypes.GOOGLE_LOGIN_START)
    .debounceTime(debounceTime)
    .switchMap(() =>
      googleSignin()
        .mergeMap(user =>
          postEpic('accounts/login', {
            email: user.email,
            providerId: user.email,
            apiKey,
            provider: 'google',
            accessToken: user.idToken,
          })
            .mergeMap(userLogin => userLoggged(userLogin))
            .catch(error => Observable.of(loginWithGoogleError(error))),
        )
        .catch(error => Observable.of(loginWithGoogleError(error))),
    )
    .catch(error => Observable.of(loginWithGoogleError(error)));

//
//  Graph request
//
const graphRequest = (endpoint, params) =>
  Observable.create(observer => {
    const infoRequest = new GraphRequest(endpoint, params, (error, result) => {
      if (error) {
        observer.error(error);
      } else {
        observer.next(result);
      }
    });
    // Start the graph request.
    new GraphRequestManager().addRequest(infoRequest).start();
  });

//
//  Handle FB sigin
//
const fbSignin = () =>
  Observable.fromPromise(
    LoginManager.logInWithReadPermissions([
      'public_profile',
      'email',
      'user_friends',
    ]),
  )
    .mergeMap(data => {
      if (!data.isCancelled)
        return Observable.fromPromise(AccessToken.getCurrentAccessToken());
      return Observable.of(null);
    })
    .mergeMap(token =>
      graphRequest('/me', {
        parameters: {
          fields: {
            string: 'id,email,name,first_name,last_name,picture',
          },
        },
      }).map(fbUser => ({ token, fbUser })),
    );

//
//  Get FB image
//
const fbUserPicture = ({ token, fbUser }) =>
  graphRequest('/me/picture?redirect=0&type=large').map(userPicture => ({
    userPicture,
    token,
    fbUser,
  }));

//
//  Handle fb register
//
export const registerWithFb = action$ =>
  action$
    .ofType(ActionTypes.FB_REGISTER_START)
    .debounceTime(debounceTime)
    .switchMap(() =>
      fbSignin()
        .mergeMap(({ token, fbUser }) => fbUserPicture({ token, fbUser }))
        .mergeMap(({ userPicture, token, fbUser }) =>
          postEpic('accounts/register', {
            email: fbUser.email,
            nickname: fbUser.name,
            providerId: fbUser.id,
            firstname: fbUser.first_name,
            lastname: fbUser.last_name,
            apiKey,
            provider: 'facebook',
            accessToken: token.accessToken,
            language: getLanguage(),
            avatar: userPicture.data.url,
            securityCode: '0',
            phone: '0',
          })
            .mergeMap(userLogin =>
              createPhotoAndLogIn(userLogin, userPicture.data.url),
            )
            .catch(error => Observable.of(registerWithFbError(error))),
        )
        .catch(error => Observable.of(registerWithFbError(error))),
    )
    .catch(error => Observable.of(registerWithFbError(error)));

//
//  Handle fb login
//
export const loginWithFb = action$ =>
  action$
    .ofType(ActionTypes.FB_LOGIN_START)
    .debounceTime(debounceTime)
    .switchMap(() =>
      fbSignin().mergeMap(({ token, fbUser }) =>
        postEpic('accounts/login', {
          email: fbUser.email,
          providerId: fbUser.id,
          apiKey,
          provider: 'facebook',
          accessToken: token.accessToken,
        })
          .mergeMap(userLogin => userLoggged(userLogin))
          .catch(error => Observable.of(loginWithFbError(error))),
      ),
    )
    .catch(error => Observable.of(loginWithFbError(error)));

//
//  Check user exist
//
export const checkUserExist = action$ =>
  action$
    .ofType(AppActionTypes.CHECK_USER_EXIST)
    .debounceTime(debounceTime)
    .switchMap(({ payload: { url } }) =>
      getEpic(url)
        .map(userExist => setUserExist(userExist))
        .catch(() => Observable.of(clearUserExist())),
    );
