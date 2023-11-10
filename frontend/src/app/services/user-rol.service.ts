import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Observable, tap } from 'rxjs';
import { RolService } from './rol.service';

@Injectable({
  providedIn: 'root',
})
export class UserRolService {
  rol: any;
  endpoint = 'http://localhost:8080/api/user-rols';
  constructor(
    private httpClient: HttpClient,
    private storage: Storage,
    private rolService: RolService
  ) {
    this.storage.create();
  }

  addUserRol(userRol: any): Observable<any> {
    return this.httpClient.post<any>(this.endpoint, userRol).pipe(
      tap(async (res: any) => {
        this.rolService.getOneRol(res.rolId).subscribe((data) => {
          this.rol = data;
          this.storage.set('rol', this.rol.nameRol);
        });
      })
    );
  }

  getOneUserRol(userRol: any): Observable<any> {
    return this.httpClient.post<any>(this.endpoint, userRol).pipe(
      tap(async (res: any) => {
        this.rolService.getOneRol(res.rolId).subscribe((data) => {
          this.rol = data;
          this.storage.set('rol', this.rol.nameRol);
        });
      })
    );
  }

  getAllUserRolByIdUser(id: number) {
    return this.httpClient.get(this.endpoint + `/${id}`);
  }
}
