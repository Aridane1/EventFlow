import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { EventService } from 'src/app/services/event.service';
import { LocationService } from 'src/app/services/location.service';
import { PhotoService } from 'src/app/services/photo.service';
import { Event } from '../../interfaces/event';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modify-event',
  templateUrl: './modify-event.page.html',
  styleUrls: ['./modify-event.page.scss'],
})
export class ModifyEventPage implements OnInit {
  eventForm: FormGroup;
  locations: any;
  capturedPhoto: any;
  isPopupOpen = false;
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

  seeImage() {
    this.isPopupOpen = true;
  }

  closeImage() {
    this.isPopupOpen = false;
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
      this.event = data;
      this.eventForm.controls['title'].setValue(this.event.name);
      this.capturedPhoto = `http://localhost:8080/images/` + this.event.img;
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

    let event: Event = {
      name: title,
      description: description,
      date: date,
      price: price,
      numTickets: numTickets,
      location: locationName,
    };

    if (!this.eventForm.valid) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Falta algun campo por rellenar',
        heightAuto: false,
      });
      return;
    } else {
      if (this.havePhoto == false) {
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

        this.eventService
          .updateEventWithPhoto(this.id, event, blob)
          .subscribe((data) => {
            Swal.fire({
              icon: 'success',
              title: 'El evento se ha registrado correctamente',
              showConfirmButton: true,
              heightAuto: false,
            }).then((result) => {
              if (result.isConfirmed) {
                this.router.navigateByUrl('/home');
              }
            });
          });
      } else {
        this.eventService.updateEvent(this.id, event).subscribe((data) => {
          Swal.fire({
            icon: 'success',
            title: 'El evento se ha registrado correctamente',
            showConfirmButton: true,
            heightAuto: false,
          }).then((result) => {
            if (result.isConfirmed) {
              this.router.navigateByUrl('/home');
            }
          });
        });
      }
    }
  }
}
