import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PhotoService } from 'src/app/services/photo.service';
import { PopoverImageComponent } from '../popover-image/popover-image.component';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-button-select-photo',
  templateUrl: './button-select-photo.component.html',
  styleUrls: ['./button-select-photo.component.scss'],
})
export class ButtonSelectPhotoComponent implements OnInit {
  capturedPhoto: any;
  @Output() capturedPhotoOutput = new EventEmitter<any>();
  constructor(
    private photoService: PhotoService,
    private popoverController: PopoverController
  ) {}

  ngOnInit() {}
  selectImage() {
    this.photoService.pickImage().then((data) => {
      this.capturedPhoto = data.webPath;
      this.capturedPhotoOutput.emit(this.capturedPhoto);
    });
  }

  discardImage() {
    this.capturedPhoto = null;
    this.capturedPhotoOutput.emit(this.capturedPhoto);
  }

  async openPopover(ev: any): Promise<void> {
    const popover = await this.popoverController.create({
      component: PopoverImageComponent,
      componentProps: {
        imageUrl: this.capturedPhoto,
      },
      event: ev,
      translucent: true,
    });

    return await popover.present();
  }
}
