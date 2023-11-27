import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NotificationLocationService {
  endpoint = 'http://localhost:8080/api/notifications-municipality';

  constructor(private httpClient: HttpClient) {}

  sendNotificationsAllMunicipality(relation: any) {
    return this.httpClient.post(this.endpoint + '/forall', relation);
  }

  sendNotificationsByIdMunicipality(relation: any) {
    return this.httpClient.post(this.endpoint, relation);
  }
}
