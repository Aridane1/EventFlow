import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SubscribeUserEventService {
  endpoint = 'http://localhost:8080/api/user-subscription-event';
  constructor(private httpClient: HttpClient) {}

  subscribeEvent(subscription: any) {
    return this.httpClient.post(this.endpoint, subscription);
  }

  getEventsSubscription(id: any): Observable<any[]> {
    return this.httpClient.get<any[]>(this.endpoint + `/${id}`);
  }

  getEventsIdsSubscription(id: any): Observable<any[]> {
    return this.httpClient.get<any[]>(this.endpoint + `/event-ids/${id}`);
  }

  deleteSubscribe(userId: number, eventId: number) {
    return this.httpClient.delete(this.endpoint + `/${userId}/${eventId}`);
  }
}
