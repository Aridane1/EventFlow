import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SeeEventPage } from './see-event.page';

const routes: Routes = [
  {
    path: '',
    component: SeeEventPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SeeEventPageRoutingModule {}
