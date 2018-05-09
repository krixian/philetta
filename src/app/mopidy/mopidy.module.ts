import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { JsonRpcModule } from '../json-rpc/json-rpc.module';
import { MopidyCoreService } from './mopidy-core.service';
import { MopidyHistoryService } from './mopidy-history.service';
import { MopidyLibraryService } from './mopidy-library.service';
import { MopidyMixerService } from './mopidy-mixer.service';
import { MopidyPlaybackService } from './mopidy-playback.service';
import { MopidyPlaylistService } from './mopidy-playlist.service';
import { MopidyTracklistService } from './mopidy-tracklist.service';


@NgModule({
  imports: [
    CommonModule,
    JsonRpcModule,
  ],
  providers: [
    {
      provide: "JSON_RPC_URL",
      useExisting: "MOPIDY_URL"
    },

    MopidyCoreService,
    MopidyHistoryService,
    MopidyLibraryService,
    MopidyMixerService,
    MopidyPlaybackService,
    MopidyPlaylistService,
    MopidyTracklistService,
  ]
})
export class MopidyModule { }
