import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  initialized = false;

  endpoint = 'http://localhost:8080/api/users';
  constructor(private httpClient: HttpClient, private storage: Storage) {}

  private getOptions(user: any) {
    let base64UserAndPassword = window.btoa(user.email + ':' + user.password);

    let basicAccess = 'Basic ' + base64UserAndPassword;

    let options = {
      headers: {
        Authorization: basicAccess,
        'Content-Type': 'application/json',
      },
      //, withCredentials: true
    };

    return options;
  }

  login(user: any): Observable<any> {
    return this.httpClient
      .post<any>(`${this.endpoint}/signin`, null, this.getOptions(user))
      .pipe(
        tap(async (res: any) => {
          if (res.user) {
            await this.storage.set('token', res.access_token);
            // await this.storage.set("idUser", res.user.id);
          }
        })
      );
  }

  register(user: any): Observable<any> {
    let newUser = {
      name: user.name,
    };
    return this.httpClient
      .post<any>(this.endpoint, newUser, this.getOptions(user))
      .pipe(
        tap(async (res: any) => {
          if (res.user) {
            
            await this.storage.set('token', res.access_token);
          }
        })
      );
  }
}
