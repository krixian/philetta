import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";

import { MopidyModule } from './mopidy/mopidy.module';
import { AppRoutingModule } from './/app-routing.module';
import { PhilettaModule } from './philetta/philetta.module';
import { AppRootComponent } from './app-root.component';

@NgModule({
  declarations: [AppRootComponent],
  bootstrap: [AppRootComponent],
  imports: [
    BrowserModule,
    RouterModule,
    MopidyModule,
    PhilettaModule,
    AppRoutingModule,
  ],
  providers: [
    {
      provide: "MOPIDY_URL",
      useValue: "ws://philetta:6680/mopidy/ws"
    }
  ]
})
export class AppModule { }
