import { debounceTime } from 'utils/api';
import { Observable } from 'rxjs';
import ImageResizer from 'react-native-image-resizer'; // eslint-disable-line

import * as ActionTypes from 'actionTypes/pairingActionTypes';

import { imageDownloader, convertToBase64 } from 'utils/imageManipulation';

import { setUserPicture } from 'actions/pairingActions';

//
//  Resize and convert image
//
const resizeAndConvert = action$ =>
  action$
    .ofType(ActionTypes.SELECT_USER_PICTURE)
    .debounceTime(debounceTime)
    .switchMap(({ payload: { picture } }) =>
      Observable.fromPromise(imageDownloader(picture)).mergeMap(photo =>
        Observable.fromPromise(
          ImageResizer.createResizedImage(photo, 250, 250, 'JPEG', 90),
        )
          .mergeMap(resizedImageUri =>
            Observable.fromPromise(convertToBase64(resizedImageUri.uri)),
          )
          .map(base64Img => setUserPicture({ img: base64Img })),
      ),
    );

export default resizeAndConvert;
