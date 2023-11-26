import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModifyEventPageRoutingModule } from './modify-event-routing.module';

import { ModifyEventPage } from './modify-event.page';
import { SharedModule } from 'src/app/shared/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ModifyEventPageRoutingModule,
    SharedModule,
  ],
  declarations: [ModifyEventPage],
})
export class ModifyEventPageModule {}
