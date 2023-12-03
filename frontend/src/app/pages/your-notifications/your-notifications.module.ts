import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { YourNotificationsPageRoutingModule } from './your-notifications-routing.module';

import { YourNotificationsPage } from './your-notifications.page';
import { SharedModule } from 'src/app/shared/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    YourNotificationsPageRoutingModule,
    SharedModule,
  ],
  declarations: [YourNotificationsPage],
})
export class YourNotificationsPageModule {}
