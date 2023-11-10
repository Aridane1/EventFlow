import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocationService } from 'src/app/services/location.service';
import { Location } from '../../interfaces/location';

@Component({
  selector: 'app-location',
  templateUrl: './location.page.html',
  styleUrls: ['./location.page.scss'],
})
export class LocationPage implements OnInit {
  locationForm: FormGroup;
  locations: any;
  constructor(
    private locationService: LocationService,
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

  onAdd() {
    const name = this.locationForm.get('name')?.value;
    let location: Location = {
      name: name,
    };
    this.locationService.addLocation(location).subscribe((data) => {
      this.getAllLocation();
    });
  }

  deleteLocation(locationId: number) {
    this.locationService.deleteLocation(locationId).subscribe((data) => {
      this.getAllLocation();
    });
  }
}
