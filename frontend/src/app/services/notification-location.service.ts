import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NotificationLocationService {
  endpoint = 'http://localhost:8080/api/notifications-municipality';

  constructor(private httpClient: HttpClient) {}

  getNotificationByLocation(locationIds: any) {
    const params = new HttpParams().set(
      'locationIds',
      locationIds.locationIds.join(',')
    );

    return this.httpClient.get(this.endpoint, { params });
  }

  sendNotificationsAllMunicipality(relation: any) {
    return this.httpClient.post(this.endpoint + '/forall', relation);
  }

  sendNotificationsByIdMunicipality(relation: any) {
    return this.httpClient.post(this.endpoint, relation);
  }
}
