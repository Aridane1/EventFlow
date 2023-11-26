import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Location } from '../interfaces/location';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  endpoint = 'http://localhost:8080/api/locations';

  constructor(private httpClient: HttpClient) {}

  getAllLocation() {
    return this.httpClient.get(this.endpoint);
  }
  getOneLocation(id: number) {
    return this.httpClient.get(this.endpoint + `/${id}`);
  }

  addLocation(location: Location, blob: any) {
    const body = new FormData();
    body.append('name', location.name);
    body.append('file', blob);
    return this.httpClient.post(this.endpoint, body);
  }

  deleteLocation(locationId: number) {
    return this.httpClient.delete(this.endpoint + `/${locationId}`);
  }
}
