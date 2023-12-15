import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EventsPageRoutingModule } from './events-routing.module';

import { EventsPage } from './events.page';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { CarruselComponent } from './carrusel/carrusel.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EventsPageRoutingModule,
    SharedModule,
  ],
  declarations: [EventsPage, CarruselComponent],
})
export class EventsPageModule {}
