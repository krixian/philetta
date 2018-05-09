import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import "rxjs/add/operator/map";
import "rxjs/add/operator/switchMap";

import { MopidyLibraryService } from '../../mopidy/mopidy-library.service';
import { MopidyTracklistService } from '../../mopidy/mopidy-tracklist.service';
import { Ref } from '../../mopidy/models/ref';
import { MopidyPlaybackService } from '../../mopidy/mopidy-playback.service';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})
export class LibraryComponent implements OnInit {

  items: Ref[];

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _library: MopidyLibraryService,
    private _playback: MopidyPlaybackService,
    private _tracklist: MopidyTracklistService,
  ) { }

  ngOnInit() {
    this._activatedRoute
      .params
      .map(d => d.uri ? d.uri : null)
      .switchMap(uri => this._library.browse(uri))
      .subscribe(refs => this.items = refs);
  }

  playTrack(ref: Ref) {
    this._tracklist
      .clear()
      .switchMap(() => this._tracklist.add([ref.uri]))
      .switchMap(t => this._playback.play(t[0].tlid))
      .subscribe();
  }
}
