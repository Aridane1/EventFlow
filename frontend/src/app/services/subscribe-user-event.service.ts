import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SubscribeUserEventService {
  endpoint = 'http://localhost:8080/api/user-subscription-event';
  constructor(private httpClient: HttpClient) {}

  subscribe(subscription: any) {
    return this.httpClient.post(this.endpoint, subscription);
  }
}
