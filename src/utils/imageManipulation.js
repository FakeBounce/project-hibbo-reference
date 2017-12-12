import RNFetchBlob from 'react-native-fetch-blob';

export const convertToBase64 = image => {
  let data = '';
  let base64image = '';
  const source = image.replace('file://', '');

  return new Promise((res, rej) => {
    return RNFetchBlob.fs.readStream(source, 'base64', 4095).then(ifstream => {
      ifstream.open();
      ifstream.onData(chunk => {
        data += chunk;
      });
      ifstream.onError(err => {
        rej(err);
      });
      ifstream.onEnd(() => {
        base64image = `data:image/png;base64,${data}`;

        res(base64image);
      });
    });
  });
};

export const imageDownloader = imageUrl => {
  return RNFetchBlob.config({
    fileCache: true,
    appendExt: 'jpg',
  })
    .fetch('GET', imageUrl)
    .then(img => {
      return img.path();
    })
    .then(data => {
      return data;
    });
};
