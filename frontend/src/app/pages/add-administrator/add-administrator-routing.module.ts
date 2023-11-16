import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddAdministratorPage } from './add-administrator.page';

const routes: Routes = [
  {
    path: '',
    component: AddAdministratorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddAdministratorPageRoutingModule {}
