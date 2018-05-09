import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LibraryComponent } from './library/library.component';

const routes: Routes = [
  { path: "philetta", component: LibraryComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PhilettaRoutingModule { }
