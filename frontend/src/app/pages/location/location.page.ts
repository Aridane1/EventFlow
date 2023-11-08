import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocationService } from 'src/app/services/location.service';

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

    this.locationService.addLocation({ name: name }).subscribe((data) => {
      this.getAllLocation();
    });
  }
  deleteLocation(locationId: number) {
    this.locationService.deleteLocation(locationId).subscribe((data) => {
      this.getAllLocation();
    });
  }
}
