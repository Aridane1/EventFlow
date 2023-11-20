import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  endpoint = 'http://localhost:8080/api/notifications';

  constructor(private httpClient: HttpClient) {}
  getNotificationsLocations() {
    return this.httpClient.get<any>(this.endpoint);
  }

  sendNotificationsAllMunicipality(message: any) {
    console.log(message);
    return this.httpClient.post(this.endpoint + '/sendforall', message);
  }
  sendNotificationsByIdMunicipality(message: any, id: any) {
    console.log(message);
    return this.httpClient.post(this.endpoint + `/send/${id}`, message);
  }
}
