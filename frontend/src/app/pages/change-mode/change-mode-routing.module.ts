import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChangeModePage } from './change-mode.page';

const routes: Routes = [
  {
    path: '',
    component: ChangeModePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChangeModePageRoutingModule {}
