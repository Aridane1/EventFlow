import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
}
