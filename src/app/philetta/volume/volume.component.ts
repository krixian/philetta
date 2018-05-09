import { Component, OnInit } from '@angular/core';
import { MopidyCoreService } from '../../mopidy/mopidy-core.service';
import { MopidyMixerService } from '../../mopidy/mopidy-mixer.service';

@Component({
  selector: 'app-volume',
  templateUrl: './volume.component.html',
  styleUrls: ['./volume.component.css']
})
export class VolumeComponent implements OnInit {
  volume: number;

  constructor(
    private _core: MopidyCoreService,
    private _mixer: MopidyMixerService,
  ) { }

  ngOnInit() {
    this._mixer.getVolume()
      .subscribe(v => this.volume = v);

    this._core.volumeChanged
      .subscribe(v => this.volume = v);
  }

  setVolume(v: string) {
    this._mixer.setVolume(parseInt(v, 10)).subscribe();
  }
}
