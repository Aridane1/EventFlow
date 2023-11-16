import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SeeAdministratorPage } from './see-administrator.page';

const routes: Routes = [
  {
    path: '',
    component: SeeAdministratorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SeeAdministratorPageRoutingModule {}
