import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { Observable, tap } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  initialized = false;

  endpoint = 'http://localhost:8080/api/users';
  constructor(
    private httpClient: HttpClient,
    private storage: Storage,
    private router: Router
  ) {
    this.storage.create();
  }

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

  login(user: User): Observable<User> {
    return this.httpClient
      .post<User>(`${this.endpoint}/signin`, null, this.getOptions(user))
      .pipe(
        tap(async (res: any) => {
          if (res.user) {
            await this.storage.set('token', res.access_token);
            await this.storage.set('idUser', res.user.id);
          }
        })
      );
  }

  register(user: User): Observable<User> {
    return this.httpClient
      .post<any>(this.endpoint, { name: user.name }, this.getOptions(user))
      .pipe(
        tap(async (res: any) => {
          if (res.user) {
            await this.storage.set('token', res.access_token);
            await this.storage.set('idUser', res.user.id);
          }
        })
      );
  }

  logout() {
    this.router.navigate(['login']);
    this.storage.remove('token');
  }

  async isLoggedIn() {
    // return this.authSubject.asObservable();
    let token = await this.storage.get('token');
    if (token) {
      return true;
    }
    this.router.navigateByUrl('/login');
    return false;
  }
}
