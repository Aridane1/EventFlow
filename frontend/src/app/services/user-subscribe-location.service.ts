import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserSubscribeLocationService {
  endpoint = 'http://localhost:8080/api/client-subscription-municipality';
  constructor(private httpClient: HttpClient) {}

  subscribeUserALocation(userSubscribeLocation: any) {
    return this.httpClient.post(this.endpoint, userSubscribeLocation);
  }

  getSubscriptionUser(userId: any) {
    return this.httpClient.get(this.endpoint + `/${userId}`);
  }
}
