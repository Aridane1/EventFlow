import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { jwtDecode } from 'jwt-decode';
import { LocationService } from 'src/app/services/location.service';
import { SubscribeUserEventService } from 'src/app/services/subscribe-user-event.service';

@Component({
  selector: 'app-your-events',
  templateUrl: './your-events.page.html',
  styleUrls: ['./your-events.page.scss'],
})
export class YourEventsPage implements OnInit {
  subscriptions: any;
  constructor(
    private subscribeUserEvent: SubscribeUserEventService,
    private locationService: LocationService,
    private storage: Storage
  ) {}

  ngOnInit() {
    this.getEventsSubscription();
  }

  async getEventsSubscription() {
    let token = await this.storage.get('token');
    let decode = jwtDecode(token) as any;

    let userId = decode.id;

    this.subscribeUserEvent
      .getEventsSubscription(userId)
      .subscribe((data: any) => {
        this.subscriptions = data;
        this.locationService.getAllLocation().subscribe((dataLocation: any) => {
          for (
            let indexEvent = 0;
            indexEvent < this.subscriptions.length;
            indexEvent++
          ) {
            for (
              let indexLocation = 0;
              indexLocation < dataLocation.length;
              indexLocation++
            ) {
              if (
                this.subscriptions[indexEvent].event.locationId ==
                dataLocation[indexLocation].id
              ) {
                this.subscriptions[indexEvent].event.locationName =
                  dataLocation[indexLocation].name;
              }
            }
          }
        });
      });
  }
}
