import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchPageRoutingModule } from './search-routing.module';

import { SearchPage } from './search.page';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { CardSearchComponent } from './card-search/card-search.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchPageRoutingModule,
    SharedModule,
  ],
  declarations: [SearchPage, CardSearchComponent],
})
export class SearchPageModule {}
