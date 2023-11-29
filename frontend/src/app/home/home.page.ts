import { Component, OnInit } from '@angular/core';
import { EventService } from '../services/event.service';
import { LocationService } from '../services/location.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  events: any;

  constructor(
    private eventService: EventService,
    private locationService: LocationService
  ) {}

  ngOnInit() {
    this.getAllEvents();
  }

  ionViewWillEnter() {
    this.getAllEvents();
  }

  getAllEvents() {
    this.eventService.getAllEvent().subscribe((dataEvent) => {
      this.events = dataEvent;
      this.locationService.getAllLocation().subscribe((dataLocation: any) => {
        for (
          let indexEvent = 0;
          indexEvent < this.events.length;
          indexEvent++
        ) {
          for (
            let indexLocation = 0;
            indexLocation < dataLocation.length;
            indexLocation++
          ) {
            if (
              this.events[indexEvent].locationId ==
              dataLocation[indexLocation].id
            ) {
              this.events[indexEvent].locationName =
                dataLocation[indexLocation].name;
            }
          }
        }
      });
    });
  }
  deleteOneEvent(id: number) {
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
        this.eventService.deleteOneEvent(id).subscribe((data) => {
          this.getAllEvents();
          Swal.fire({
            title: 'Eliminado!',
            text: 'El evento ha sido eliminado.',
            icon: 'success',
            heightAuto: false,
          });
        });
      }
    });
  }
}
