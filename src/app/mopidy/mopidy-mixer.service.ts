import { Injectable } from '@angular/core';
import { JsonRpcService } from '../json-rpc/json-rpc.service';

@Injectable()
export class MopidyMixerService {
  constructor(
    private jsonRpcService: JsonRpcService
  ) {}

  getMute = () => this.jsonRpcService.rpcRequest<boolean>("core.mixer.get_mute");
  setMute = (mute: boolean) => this.jsonRpcService.rpcRequest<boolean>("core.mixer.set_mute", [mute]);
  getVolume = () =>this.jsonRpcService.rpcRequest<number>("core.mixer.get_volume");
  setVolume = (volume: number) => this.jsonRpcService.rpcRequest<boolean>("core.mixer.set_volume", [volume]);
}
