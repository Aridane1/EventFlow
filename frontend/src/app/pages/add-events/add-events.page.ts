import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EventService } from 'src/app/services/event.service';
import { LocationService } from 'src/app/services/location.service';
import { PhotoService } from 'src/app/services/photo.service';
import { Event } from '../../interfaces/event';

@Component({
  selector: 'app-add-events',
  templateUrl: './add-events.page.html',
  styleUrls: ['./add-events.page.scss'],
})
export class AddEventsPage implements OnInit {
  eventForm: FormGroup;
  locations: any;
  capturedPhoto: any;
  isPopupOpen = false;
  constructor(
    private formBuilder: FormBuilder,
    private eventService: EventService,
    private locationService: LocationService,
    private photoService: PhotoService,
    private router: Router
  ) {
    this.eventForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      dateTime: ['', Validators.required],
      numTickets: ['', Validators.required],
      price: ['', Validators.required],
      locationName: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.getAllLocation();
  }

  ionViewWillEnter() {
    this.eventForm.reset();
    this.capturedPhoto = null;
  }

  discardImage() {
    this.capturedPhoto = null;
  }

  seeImage() {
    this.isPopupOpen = true;
  }

  closeImage() {
    this.isPopupOpen = false;
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

  async addEvent() {
    const title = this.eventForm.get('title')?.value;
    const description = this.eventForm.get('description')?.value;
    const date = this.eventForm.get('dateTime')?.value;
    const locationName = this.eventForm.get('locationName')?.value;
    const price = this.eventForm.get('price')?.value;
    const numTickets = this.eventForm.get('numTickets')?.value;

    let event: Event = {
      name: title,
      description: description,
      date: date,
      price: price,
      numTickets: numTickets,
      location: locationName,
    };

    if (!this.eventForm.valid) {
      if (date == null) {
        console.log('The date is null');
        return;
      }
      console.log(event);
      console.log('Please provide all the required values!');
      return;
    } else {
      let blob = null;
      if (this.capturedPhoto != '') {
        const response = await fetch(this.capturedPhoto);
        blob = await response.blob();
      }
      this.eventService.addEvent(event, blob).subscribe((data) => {
        this.router.navigateByUrl('/home');
      });
    }
  }
}
