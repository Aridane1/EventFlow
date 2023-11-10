import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddEventsPageRoutingModule } from './add-events-routing.module';

import { AddEventsPage } from './add-events.page';
import { MenuComponent } from 'src/app/components/menu/menu.component';
import { SharedModule } from 'src/app/shared/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AddEventsPageRoutingModule,
    SharedModule,
  ],
  declarations: [AddEventsPage],
})
export class AddEventsPageModule {}
