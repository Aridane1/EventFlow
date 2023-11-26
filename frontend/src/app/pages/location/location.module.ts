import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LocationPageRoutingModule } from './location-routing.module';

import { LocationPage } from './location.page';
import { SharedModule } from 'src/app/shared/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    LocationPageRoutingModule,
    SharedModule,
  ],
  declarations: [LocationPage],
})
export class LocationPageModule {}
