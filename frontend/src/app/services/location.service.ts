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

  addLocation(location: any) {
    return this.httpClient.post(this.endpoint, location);
  }

  deleteLocation(locationId: any) {
    return this.httpClient.delete(this.endpoint + `/${locationId}`);
  }
}
