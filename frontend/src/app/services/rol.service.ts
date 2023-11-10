import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RolService {
  endpint = 'http://localhost:8080/api/rols';
  constructor(private httpClient: HttpClient) {}

  getOneRol(id: number) {
    return this.httpClient.get(this.endpint + `/${id}`);
  }
}
