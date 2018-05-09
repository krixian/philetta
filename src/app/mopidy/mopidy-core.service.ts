import { Injectable } from '@angular/core';
import { JsonRpcService } from '../json-rpc/json-rpc.service';
import { Observable } from 'rxjs/Observable';
import "rxjs/add/operator/do";
import "rxjs/add/operator/filter";
import { PlaybackState } from './models/playback-state.enum';
import { Playlist } from './models/playlist';
import { TracklistTrack } from './models/tracklist-track';

@Injectable()
export class MopidyCoreService {
  muteChanged: Observable<boolean>;
  playbackStateChanged: Observable<{oldState: PlaybackState, newState: PlaybackState}>;
  playlistChanged: Observable<Playlist>;
  playlistDeleted: Observable<string>;
  seeḱed: Observable<number>;
  streamTitleChanged: Observable<string>;
  trackPlaybackEnded: Observable<{track: TracklistTrack, position: number}>;
  trackPlaybackPaused: Observable<{track: TracklistTrack, position: number}>;
  trackPlaybackResumed: Observable<{track: TracklistTrack, position: number}>;
  trackPlaybackStarted: Observable<TracklistTrack>;
  volumeChanged: Observable<number>;

  constructor(
    private jsonRpcService: JsonRpcService
  ) {
    this.registerEvents();
  }

  getUriSchemes = () => this.jsonRpcService.rpcRequest<string[]>("core.get_uri_schemes");
  getVersion = () => this.jsonRpcService.rpcRequest<string>("core.get_version");

  private registerEvents() {
    this.muteChanged = this.filterMessages("mute_changed", m => m.mute);
    this.volumeChanged = this.filterMessages("volume_changed", m => m.volume);
  }

  private filterMessages<T>(event: string, project: (value: any) => T) {
    return this.jsonRpcService
      .messages
      .filter(m => m.event === event)
      .map(project);
  }
}