import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { jwtDecode } from 'jwt-decode';
import { firstValueFrom } from 'rxjs';
import { NotificatinEventService } from 'src/app/services/notificatin-event.service';
import { NotificationLocationService } from 'src/app/services/notification-location.service';
import { SubscribeUserEventService } from 'src/app/services/subscribe-user-event.service';
import { UserSubscribeLocationService } from 'src/app/services/user-subscribe-location.service';

@Component({
  selector: 'app-your-notifications',
  templateUrl: './your-notifications.page.html',
  styleUrls: ['./your-notifications.page.scss'],
})
export class YourNotificationsPage implements OnInit {
  notifications: any = [];
  constructor(
    private storage: Storage,
    private notificationsLocationService: NotificationLocationService,
    private notificationsEventService: NotificatinEventService,
    private userSubscribeEventService: SubscribeUserEventService,
    private userSubscribeLocationService: UserSubscribeLocationService
  ) {
    this.storage.create();
  }

  ngOnInit() {
    this.getAllNotificationsForUser();
  }

  ionViewWillEnter() {
    this.getAllNotificationsForUser();
  }

  async getAllNotificationsForUser() {
    let token = await this.storage.get('token');
    let user = jwtDecode(token) as any;

    let locationIds = await firstValueFrom(
      this.userSubscribeLocationService.getSubscriptionUser(user.id)
    );
    let eventsIds = await firstValueFrom(
      this.userSubscribeEventService.getEventsIdsSubscription(user.id)
    );

    this.notifications = this.notifications.concat(
      await firstValueFrom(
        this.notificationsLocationService.getNotificationByLocation({
          locationIds: locationIds,
        })
      )
    );

    this.notifications = this.notifications.concat(
      await firstValueFrom(
        this.notificationsEventService.getNotificationByLocation({
          eventIds: eventsIds,
        })
      )
    );
    this.notifications.sort((a: any, b: any) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();

      return dateB - dateA;
    });
  }

  expandNotification(notification: any) {
    notification.expanded = true;
  }
  contractNotification(notification: any) {
    notification.expanded = false;
  }
}
