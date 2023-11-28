import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddAdministratorPageRoutingModule } from './add-administrator-routing.module';

import { AddAdministratorPage } from './add-administrator.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AddAdministratorPageRoutingModule,
  ],
  declarations: [AddAdministratorPage],
})
export class AddAdministratorPageModule {}
