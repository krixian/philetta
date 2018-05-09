import { Injectable } from '@angular/core';
import { JsonRpcService } from '../json-rpc/json-rpc.service';
import { TracklistTrack } from './models/tracklist-track';
import { Track } from './models/track';
import { PlaybackState } from './models/playback-state.enum';

@Injectable()
export class MopidyPlaybackService {
  constructor(
    private jsonRpcService: JsonRpcService
  ) {}

  play = (tlId: number) => this.jsonRpcService.rpcRequest("core.playback.play", [null, tlId]);
  next = () => this.jsonRpcService.rpcRequest("core.playback.next");
  previous = () => this.jsonRpcService.rpcRequest("core.playback.previous");
  stop = () => this.jsonRpcService.rpcRequest("core.playback.stop");
  pause = () => this.jsonRpcService.rpcRequest("core.playback.pause");
  resume = () => this.jsonRpcService.rpcRequest("core.playback.resume");
  seek = (position: number) => this.jsonRpcService.rpcRequest<boolean>("core.playback.seek", [position]);

  getCurrentTracklistTrack = () => this.jsonRpcService.rpcRequest<TracklistTrack>("core.playback.get_current_tl_track");
  getCurrentTrack = () => this.jsonRpcService.rpcRequest<Track>("core.playback.get_current_track");
  getStreamTitle = () => this.jsonRpcService.rpcRequest<string>("core.playback.get_stream_title");
  getPosition = () => this.jsonRpcService.rpcRequest<number>("core.playback.get_time_position");

  getState = () => this.jsonRpcService.rpcRequest<PlaybackState>("core.playback.get_state");
  setState = (state: PlaybackState) => this.jsonRpcService.rpcRequest("core.playback.set_state", [state]);
}
