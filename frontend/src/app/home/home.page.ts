import { Component, OnInit } from '@angular/core';
import { EventService } from '../services/event.service';
import { LocationService } from '../services/location.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  events: any;
  theme: any;

  constructor(
    private storage: Storage,
    private eventService: EventService,
    private locationService: LocationService
  ) {}

  async ngOnInit() {
    this.getAllEvents();
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
    if (this.theme == null) {
      this.theme = await this.storage.set('mode', 'white');
      html?.classList.remove('dark');
      document.documentElement.style.setProperty('--bg-color', '#a5acb8');
    }
  }

  ionViewWillEnter() {
    this.getAllEvents();
  }

  getAllEvents() {
    this.eventService.getAllEvent().subscribe(
      (dataEvent) => {
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
      },
      (err) => {
        this.alert(err);
      }
    );
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
    }).then(
      (result) => {
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
      },
      (err) => {
        this.alert(err);
      }
    );
  }
  alert(err: any) {
    if (err.status === 0) {
      Swal.fire({
        position: 'top',
        icon: 'error',
        title: 'Error de conexción',
        showConfirmButton: false,
        heightAuto: false,
      });
      return;
    }
    if (err.status === 500) {
      Swal.fire({
        position: 'top',
        icon: 'error',
        title: 'El usuario o la contraseña están mal',
        showConfirmButton: false,
        timer: 1500,
        heightAuto: false,
      });
      return;
    }
  }
}
