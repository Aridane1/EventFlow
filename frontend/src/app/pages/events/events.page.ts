import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/services/event.service';
import { LocationService } from 'src/app/services/location.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.page.html',
  styleUrls: ['./events.page.scss'],
})
export class EventsPage implements OnInit {
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
              console.log(this.events[indexEvent]);
            }
          }
        }
      });
    });
  }
}
