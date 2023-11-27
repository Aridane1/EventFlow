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

  create(message: any) {
    return this.httpClient.post(this.endpoint, message);
  }
}
