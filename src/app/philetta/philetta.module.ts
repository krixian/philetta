import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PhilettaRoutingModule } from './philetta-routing.module';
import { LibraryComponent } from './library/library.component';
import { MopidyModule } from '../mopidy/mopidy.module';
import { VolumeComponent } from './volume/volume.component';
import { NowPlayingComponent } from './now-playing/now-playing.component';

@NgModule({
  imports: [
    CommonModule,
    MopidyModule,
    PhilettaRoutingModule
  ],
  declarations: [LibraryComponent, VolumeComponent, NowPlayingComponent]
})
export class PhilettaModule { }
