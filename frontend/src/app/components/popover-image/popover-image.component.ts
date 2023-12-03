import { Component, Input, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-popover-image',
  templateUrl: './popover-image.component.html',
  styleUrls: ['./popover-image.component.scss'],
})
export class PopoverImageComponent {
  @Input() imageUrl: string = '';
  constructor(private popoverController: PopoverController) {}

  closePopover(): void {
    this.popoverController.dismiss();
  }
}
