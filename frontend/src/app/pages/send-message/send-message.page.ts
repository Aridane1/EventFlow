import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocationService } from 'src/app/services/location.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-send-message',
  templateUrl: './send-message.page.html',
  styleUrls: ['./send-message.page.scss'],
})
export class SendMessagePage implements OnInit {
  locations: any;
  messageForm: FormGroup;
  constructor(
    private formBuild: FormBuilder,
    private locationService: LocationService,
    private notificationService: NotificationService
  ) {
    this.messageForm = this.formBuild.group({
      title: ['', Validators.required],
      message: ['', Validators.required],
      location: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.getAllLocations();
  }

  getAllLocations() {
    this.locationService.getAllLocation().subscribe((data: any) => {
      this.locations = data;
    });
  }
  sendMessage() {
    const title = this.messageForm.get('title')?.value;
    const message = this.messageForm.get('message')?.value;
    const location = this.messageForm.get('location')?.value;
    if (location === 'all') {
      this.notificationService
        .sendNotificationsAllMunicipality({ title: title, message: message })
        .subscribe((data) => {});
    } else {
      this.notificationService
        .sendNotificationsByIdMunicipality(
          { title: title, message: message },
          location
        )
        .subscribe((data) => {});
    }
  }
}
