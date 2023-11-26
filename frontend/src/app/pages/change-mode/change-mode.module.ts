import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChangeModePageRoutingModule } from './change-mode-routing.module';

import { ChangeModePage } from './change-mode.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChangeModePageRoutingModule
  ],
  declarations: [ChangeModePage]
})
export class ChangeModePageModule {}
