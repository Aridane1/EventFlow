import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class NotificatinEventService {
  endpointNotificationEvent = 'http://localhost:8080/api/notification-event';
  endpointNotificationEventUser =
    'http://localhost:8080/api/relation-notification-event';
  constructor(private httpClient: HttpClient) {}

  create(message: any) {
    return this.httpClient.post(this.endpointNotificationEvent, message);
  }

  sendMessage(relation: any) {
    return this.httpClient.post(this.endpointNotificationEventUser, relation);
  }

  getNotificationByLocation(eventIds: any) {
    const params = new HttpParams().set(
      'eventIds',
      eventIds.eventIds.join(',')
    );
    return this.httpClient.get(this.endpointNotificationEventUser, { params });
  }
}
