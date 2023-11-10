import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Event } from '../interfaces/event';
@Injectable({
  providedIn: 'root',
})
export class EventService {
  endpoint = 'http://localhost:8080/api/events';
  constructor(private httpClient: HttpClient) {}

  getAllEvent() {
    return this.httpClient.get(this.endpoint);
  }
  getOneEvent(id: number) {
    return this.httpClient.get(this.endpoint + `/${id}`);
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

  updateEventWithPhoto(id: number, event: Event, blob: any) {
    let formData = new FormData();
    formData.append('name', event.name);
    formData.append('description', event.description);
    formData.append('date', event.date);
    formData.append('price', event.price);
    formData.append('numTickets', event.numTickets);
    formData.append('location', event.location);
    formData.append('file', blob);

    return this.httpClient.put(this.endpoint + `/no-image/${id}`, formData);
  }
  updateEvent(id: number, event: Event) {
    return this.httpClient.put(this.endpoint + `/${id}`, event);
  }
}
