import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SeeAdministratorPageRoutingModule } from './see-administrator-routing.module';

import { SeeAdministratorPage } from './see-administrator.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SeeAdministratorPageRoutingModule
  ],
  declarations: [SeeAdministratorPage]
})
export class SeeAdministratorPageModule {}
