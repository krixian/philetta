import { Injectable } from '@angular/core';
import { JsonRpcService } from '../json-rpc/json-rpc.service';
import { Ref } from './models/ref';

@Injectable()
export class MopidyHistoryService {

  constructor(
    private jsonRpcService: JsonRpcService
  ) {}

  getHistory = () => this.jsonRpcService.rpcRequest<[any, Ref]>("core.history.get_history");
  getLength = () => this.jsonRpcService.rpcRequest<number>("core.history.get_length");
}
