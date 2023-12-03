import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { YourNotificationsPage } from './your-notifications.page';

const routes: Routes = [
  {
    path: '',
    component: YourNotificationsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class YourNotificationsPageRoutingModule {}
