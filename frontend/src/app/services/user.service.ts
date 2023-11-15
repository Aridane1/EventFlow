import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  endpoint: any = 'http://localhost:8080/api/users';
  constructor(private httpClient: HttpClient) {}

  getUserByToken(token: string) {
    return this.httpClient.post(`${this.endpoint}`, null, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }
}
