import { Observable } from 'rxjs';
import Nes from 'nes/client';
import { API } from './api';

class Websocket {
  static client = null;

  static connect(token, urlArray) {
    const observable = Observable.create(observer => {
      if (!Websocket.client) {
        Websocket.client = new Nes.Client(API);
      }

      Websocket.client.connect(
        { auth: { headers: { authorization: `Bearer ${token}` } } },
        error => {
          if (error) {
            observer.error(error);
          } else {
            // eslint-disable-next-line
            for (const { url, func } of urlArray) {
              Websocket.createObservable(url, func, observer);
            }
          }
        },
      );
      Websocket.client.onError = err => {
        observer.error(err);
      };
    });

    return observable;
  }

  static createObservable(url, func, observer) {
    if (!Websocket.client) {
      observer.error(new Error('No socket client'));
    } else {
      Websocket.client.subscribe(
        url,
        data => {
          observer.next({ data, func });
        },
        err => {
          if (err) {
            observer.error(
              new Error(`ERROR WHILE SUBSCRIBING TO ${url}: ${err}`),
            );
          }
        },
      );
    }
  }
}

export default Websocket;
