import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  endpoint = 'http://localhost:8080/api/locations';

  constructor(private httpClient: HttpClient) {}

  getAllLocation() {
    return this.httpClient.get(this.endpoint);
  }
}
