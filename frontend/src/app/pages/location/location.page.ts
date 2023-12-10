import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocationService } from 'src/app/services/location.service';
import { Location } from '../../interfaces/location';
import { PhotoService } from 'src/app/services/photo.service';
import Swal from 'sweetalert2';
import { firstValueFrom } from 'rxjs';
import { PopoverImageComponent } from 'src/app/components/popover-image/popover-image.component';
import { PopoverController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-location',
  templateUrl: './location.page.html',
  styleUrls: ['./location.page.scss'],
})
export class LocationPage implements OnInit {
  locationForm: FormGroup;
  locations: any;
  isPopupOpen = false;
  capturedPhoto: any;
  theme: any;
  searcher: string = '';
  constructor(
    private locationService: LocationService,
    private photoService: PhotoService,
    private popoverController: PopoverController,
    private formBuilder: FormBuilder,
    private storage: Storage
  ) {
    this.locationForm = this.formBuilder.group({
      name: ['', Validators.required],
    });
  }

  async ngOnInit() {
    this.getAllLocation();
    this.theme = await this.storage.get('mode');
    let html = document.querySelector('html');
    if (this.theme == 'dark') {
      html?.classList.add('dark');
      document.documentElement.style.setProperty('--bg-color', 'rgb(51 65 85)');
    }
    if (this.theme == 'white') {
      html?.classList.remove('dark');
      document.documentElement.style.setProperty('--bg-color', '#a5acb8');
    }
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

  discardImage() {
    this.capturedPhoto = null;
  }

  async getAllLocation() {
    this.locations = await firstValueFrom(
      this.locationService.getAllLocation()
    );
  }

  selectImage(photo: any) {
    this.capturedPhoto = photo;
  }

  async onAdd() {
    const name = this.locationForm.get('name')?.value;

    let location: Location = {
      name: name,
    };

    const locationExist = this.locations.some(
      (existingLocation: any) => existingLocation.name === location.name
    );

    if (locationExist) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `La localidad ${name} ya existe`,
        heightAuto: false,
      });
      return;
    }

    if (!this.locationForm.valid) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Falta algun campo por rellenar',
        heightAuto: false,
      });
      return;
    } else {
      let blob = null;
      if (!this.capturedPhoto) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Falta añadir una foto',
          heightAuto: false,
        });
        return;
      }
      const response = await fetch(this.capturedPhoto);
      blob = await response.blob();

      this.locationService.addLocation(location, blob).subscribe((data) => {
        Swal.fire({
          icon: 'success',
          title: 'Se ha registrado el municipio correctamente',
          heightAuto: false,
        });
        this.getAllLocation();
        this.locationForm.reset();
      });
    }
  }

  deleteLocation(locationId: number) {
    Swal.fire({
      title: 'Estas seguro?',
      text: 'No podras revertir el cambio!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
      heightAuto: false,
    }).then((result) => {
      if (result.isConfirmed) {
        this.locationService.deleteLocation(locationId).subscribe((data) => {
          this.getAllLocation();
          Swal.fire({
            title: 'Eliminado!',
            text: 'La localidad se ha sido eliminado.',
            icon: 'success',
            heightAuto: false,
          });
        });
      }
    });
  }

  onSearch() {
    if (this.searcher.trim() === '') return this.locations;
    return this.locations.filter((location: any) => {
      return location.name.toLowerCase().includes(this.searcher.toLowerCase());
    });
  }
}
