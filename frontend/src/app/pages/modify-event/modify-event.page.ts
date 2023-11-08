import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { EventService } from 'src/app/services/event.service';
import { LocationService } from 'src/app/services/location.service';
import { PhotoService } from 'src/app/services/photo.service';

@Component({
  selector: 'app-modify-event',
  templateUrl: './modify-event.page.html',
  styleUrls: ['./modify-event.page.scss'],
})
export class ModifyEventPage implements OnInit {
  eventForm: FormGroup;
  locations: any;
  capturedPhoto: any;
  event: any;
  id: any;
  havePhoto = true;
  constructor(
    private formBuilder: FormBuilder,
    private eventService: EventService,
    private locationService: LocationService,
    private photoService: PhotoService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.eventForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      dateTime: ['', Validators.required],
      numTickets: ['', Validators.required],
      price: ['', Validators.required],
      locationName: ['', Validators.required],
    });
    //Almacena dentro de la variable id el parametro que se envia
    this.id = this.activatedRoute.snapshot.params['id'];
  }

  ngOnInit() {
    this.getAllLocation();
  }

  ionViewWillEnter() {
    this.getOneEvent(this.id);
    this.eventForm.reset();
    this.capturedPhoto = null;
  }

  discardImage() {
    this.capturedPhoto = null;
    this.havePhoto = false;
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
    this.havePhoto = false;
  }

  getOneEvent(id: any) {
    this.eventService.getOneEvent(id).subscribe((data) => {
      //almacena los datos en el formulario
      this.event = data;
      this.eventForm.controls['title'].setValue(this.event.name);
      this.capturedPhoto = this.event.img;
      this.eventForm.controls['dateTime'].setValue(this.event.date);
      this.eventForm.controls['price'].setValue(this.event.price);
      this.eventForm.controls['numTickets'].setValue(this.event.numTickets);
      this.eventForm.controls['description'].setValue(this.event.description);
      this.eventForm.controls['locationName'].setValue(this.event.locationId);
    });
  }
  async updateEvent() {
    const title = this.eventForm.get('title')?.value;
    const description = this.eventForm.get('description')?.value;
    const date = this.eventForm.get('dateTime')?.value;
    const locationName = this.eventForm.get('locationName')?.value;
    const price = this.eventForm.get('price')?.value;
    const numTickets = this.eventForm.get('numTickets')?.value;
    if (!this.eventForm.valid) {
      if (date == null) {
        console.log('The date is null');
        return;
      }
      console.log('Please provide all the required values!');
      return;
    } else {
      let blob = null;
      if (this.capturedPhoto != '') {
        const response = await fetch(this.capturedPhoto);
        blob = await response.blob();
      }
      if (this.havePhoto == false) {
        console.log('false');
        this.eventService
          .updateEventWithPhoto(
            this.id,
            {
              name: title,
              description: description,
              date: date,
              price: price,
              numTickets: numTickets,
              location: locationName,
            },
            blob
          )
          .subscribe((data) => {
            this.router.navigateByUrl('/home');
          });
      } else {
        console.log('true');
        this.eventService
          .updateEvent(this.id, {
            name: title,
            description: description,
            date: date,
            price: price,
            numTickets: numTickets,
            location: locationName,
          })
          .subscribe((data) => {
            this.router.navigateByUrl('/home');
          });
      }
    }
  }
}
