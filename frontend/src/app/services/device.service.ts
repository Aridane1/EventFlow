import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DeviceService {
  endpoint = 'http://localhost:8080/api/devices';

  constructor(private httpClient: HttpClient) {}
  subscribeDevice(deviceUser: any) {
    console.log(deviceUser);
    return this.httpClient.post(this.endpoint, deviceUser);
  }
}
