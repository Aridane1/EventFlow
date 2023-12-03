import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from 'src/app/components/menu/menu.component';
import { CardComponent } from 'src/app/components/card/card.component';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { PopoverComponent } from 'src/app/components/menu/popover/popover.component';
import { PopoverImageComponent } from 'src/app/components/popover-image/popover-image.component';

@NgModule({
  declarations: [
    MenuComponent,
    CardComponent,
    PopoverComponent,
    PopoverImageComponent,
  ],
  imports: [CommonModule, RouterModule, IonicModule],
  exports: [MenuComponent, CardComponent, PopoverImageComponent],
})
export class SharedModule {}
