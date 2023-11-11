import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from 'src/app/components/menu/menu.component';
import { CardComponent } from 'src/app/components/card/card.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [MenuComponent, CardComponent],
  imports: [CommonModule, RouterModule],
  exports: [MenuComponent, CardComponent],
})
export class SharedModule {}
