import { Injectable } from '@angular/core';
import { JsonRpcService } from '../json-rpc/json-rpc.service';
import { TracklistTrack } from './models/tracklist-track';
import { TracklistFilter } from './models/tracklist-filter';

@Injectable()
export class MopidyTracklistService {
  constructor(
    private jsonRpcService: JsonRpcService
  ) {}

  add = (uris: string[], position?: number) => this.jsonRpcService.rpcRequest<TracklistTrack[]>("core.tracklist.add", [null, position, null, uris]);
  remove = (criteria: TracklistFilter) => this.jsonRpcService.rpcRequest<TracklistTrack[]>("core.tracklist.remove", [criteria]);
  clear = () => this.jsonRpcService.rpcRequest("core.tracklist.clear");
  move = (start:number, end:number, postion:number) => this.jsonRpcService.rpcRequest("core.tracklist.move", [start, end, postion]);
  shuffle = (start?:number, end?:number) => this.jsonRpcService.rpcRequest("core.tracklist.shuffle", [start, end]);

  tracks = () => this.jsonRpcService.rpcRequest<TracklistTrack[]>("core.tracklist.get_tl_tracks");
  index = (tlid: number) => this.jsonRpcService.rpcRequest<number>("core.tracklist.index", [null, tlid]);
  version = () => this.jsonRpcService.rpcRequest<number>("core.tracklist.version");
  length = () => this.jsonRpcService.rpcRequest<number>("core.tracklist.get_length");
  slice = (start:number, end:number) => this.jsonRpcService.rpcRequest<TracklistTrack[]>("core.tracklist.get_length");
  filter = (criteria: TracklistFilter) => this.jsonRpcService.rpcRequest<TracklistTrack[]>("core.tracklist.filter", [criteria]);
}
