import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { YourEventsPageRoutingModule } from './your-events-routing.module';

import { YourEventsPage } from './your-events.page';
import { SharedModule } from 'src/app/shared/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    YourEventsPageRoutingModule,
    SharedModule,
  ],
  declarations: [YourEventsPage],
})
export class YourEventsPageModule {}
