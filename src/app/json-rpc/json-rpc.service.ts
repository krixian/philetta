import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { WebSocketSubject } from 'rxjs/observable/dom/WebSocketSubject';
import "rxjs/add/observable/defer";
import "rxjs/add/observable/dom/webSocket";
import "rxjs/add/operator/do";
import "rxjs/add/operator/first";

@Injectable()
export class JsonRpcService {
  private _id = 0;
  private _ws: WebSocketSubject<any>;

  messages: Observable<any>;

  constructor(
    @Inject("JSON_RPC_URL") url: string,
  ) {
    this.connect(url);
  }

  private connect(url: string) {
    this._ws = Observable.webSocket(url);
    this.messages = this._ws
      .do(m => console.info(m));
  }

  private nextId() {
    this._id++;
    return this._id;
  }

  rpcRequest<T = void>(method: string, params = []): Observable<T> {
    return Observable.defer(() => {
      const id = this.nextId();
      this._ws.next(JSON.stringify({
        jsonrpc: "2.0",
        id: id,
        method: method,
        params: params,
      }));
      return this._ws
        .first(r => r.id === id, r => {
          if (r.error) {
            throw r.error;
          }

          return r.result;
        });
    });
  }

}