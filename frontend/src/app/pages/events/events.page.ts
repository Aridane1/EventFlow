import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { AuthService } from 'src/app/services/auth.service';
import { EventService } from 'src/app/services/event.service';
import { LocationService } from 'src/app/services/location.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.page.html',
  styleUrls: ['./events.page.scss'],
})
export class EventsPage implements OnInit {
  events: any;
  theme: any;
  constructor(
    private eventService: EventService,
    private locationService: LocationService,
    private storage: Storage
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
}
