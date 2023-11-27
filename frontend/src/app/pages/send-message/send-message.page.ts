import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventService } from 'src/app/services/event.service';
import { LocationService } from 'src/app/services/location.service';
import { NotificatinEventService } from 'src/app/services/notificatin-event.service';
import { NotificationLocationService } from 'src/app/services/notification-location.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-send-message',
  templateUrl: './send-message.page.html',
  styleUrls: ['./send-message.page.scss'],
})
export class SendMessagePage implements OnInit {
  locations: any;
  events: any;
  messageForm: FormGroup;
  segmentSelected = 'location';

  constructor(
    private formBuild: FormBuilder,
    private locationService: LocationService,
    private eventService: EventService,
    private notificationService: NotificationService,
    private notificationLocationService: NotificationLocationService,
    private notificationEventService: NotificatinEventService
  ) {
    this.messageForm = this.formBuild.group({
      title: ['', Validators.required],
      message: ['', Validators.required],
      location: [''],
      event: [''],
    });
  }

  ngOnInit() {
    this.getAllLocations();
    this.getAllEvents();
  }

  getAllLocations() {
    this.locationService.getAllLocation().subscribe((data: any) => {
      this.locations = data;
    });
  }

  getAllEvents() {
    this.eventService.getAllEvent().subscribe((data: any) => {
      this.events = data;
    });
  }

  sendMessage() {
    const title = this.messageForm.get('title')?.value;
    const message = this.messageForm.get('message')?.value;
    if (this.segmentSelected === 'location') {
      const location = this.messageForm.get('location')?.value;
      if (location === 'all') {
        this.notificationService
          .create({ title: title, message: message })
          .subscribe((data: any) => {
            this.notificationLocationService
              .sendNotificationsAllMunicipality({
                notificationId: data.id,
              })
              .subscribe((data) => {});
          });
      } else {
        this.notificationService
          .create({ title: title, message: message })
          .subscribe((data: any) => {
            this.notificationLocationService
              .sendNotificationsByIdMunicipality({
                notificationId: data.id,
                locationId: Number(location),
              })
              .subscribe((data) => {});
          });
      }
    } else if (this.segmentSelected === 'event') {
      const event = this.messageForm.get('event')?.value;

      this.notificationEventService
        .create({ title: title, message: message })
        .subscribe((data: any) => {
          console.log(data);
          this.notificationEventService
            .sendMessage({ notificationId: data.id, eventId: Number(event) })
            .subscribe((data: any) => {});
        });
    }
  }
  segmentChanged(event: any) {
    this.segmentSelected = event.detail.value;
  }
}
