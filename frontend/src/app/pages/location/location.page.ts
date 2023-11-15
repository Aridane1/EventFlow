import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocationService } from 'src/app/services/location.service';
import { Location } from '../../interfaces/location';
import { PhotoService } from 'src/app/services/photo.service';

@Component({
  selector: 'app-location',
  templateUrl: './location.page.html',
  styleUrls: ['./location.page.scss'],
})
export class LocationPage implements OnInit {
  locationForm: FormGroup;
  locations: any;
  capturedPhoto: any;
  constructor(
    private locationService: LocationService,
    private photoService: PhotoService,

    private formBuilder: FormBuilder
  ) {
    this.locationForm = this.formBuilder.group({
      name: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.getAllLocation();
  }

  getAllLocation() {
    this.locationService.getAllLocation().subscribe((data) => {
      this.locations = data;
    });
  }
  selectImage() {
    this.photoService.pickImage().then((data) => {
      this.capturedPhoto = data.webPath;
    });
  }

  async onAdd() {
    const name = this.locationForm.get('name')?.value;
    let location: Location = {
      name: name,
    };

    if (!this.locationForm.valid) {
      console.log('Please provide all the required values!');
      return;
    } else {
      let blob = null;
      if (this.capturedPhoto != '') {
        const response = await fetch(this.capturedPhoto);
        blob = await response.blob();
      }

      this.locationService.addLocation(location, blob).subscribe((data) => {
        this.getAllLocation();
      });
    }
  }

  deleteLocation(locationId: number) {
    this.locationService.deleteLocation(locationId).subscribe((data) => {
      this.getAllLocation();
    });
  }
}
