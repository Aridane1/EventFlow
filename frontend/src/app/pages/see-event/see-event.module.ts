import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SeeEventPageRoutingModule } from './see-event-routing.module';

import { SeeEventPage } from './see-event.page';
import { SharedModule } from 'src/app/shared/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SeeEventPageRoutingModule,
    SharedModule,
  ],
  declarations: [SeeEventPage],
})
export class SeeEventPageModule {}
