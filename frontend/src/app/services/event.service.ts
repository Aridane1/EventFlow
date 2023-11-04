import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  endpoint = 'http://localhost:8080/api/events';
  constructor(private httpClient: HttpClient) {}

  getAllEvent() {
    return this.httpClient.get(this.endpoint);
  }

  addEvent(event: any, blob: any) {
    let formData = new FormData();
    formData.append('name', event.name);
    formData.append('description', event.description);
    formData.append('date', event.date);
    formData.append('file', blob);
    formData.append('price', event.price);
    formData.append('numTickets', event.numTickets);
    formData.append('location', event.location);

    return this.httpClient.post(this.endpoint, formData);
  }

  deleteOneEvent(id: number) {
    return this.httpClient.delete(this.endpoint + `/${id}`);
  }
}
