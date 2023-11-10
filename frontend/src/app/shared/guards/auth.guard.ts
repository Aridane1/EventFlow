import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { Observable, firstValueFrom } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { UserRolService } from 'src/app/services/user-rol.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  userRoles: any;
  constructor(
    private authService: AuthService,
    private router: Router,
    private userRolService: UserRolService,
    private storage: Storage
  ) {}

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    const isAuthenticated = await this.authService.isLoggedIn();
    const allowedRoles = route.data['allowedRoles'];

    const userId = await this.storage.get('idUser');

    this.userRoles = await firstValueFrom(
      this.userRolService.getAllUserRolByIdUser(1)
    );
    console.log(this.userRoles);
    console.log(allowedRoles);
    console.log(isAuthenticated && this.userRoles.includes(allowedRoles));

    if (isAuthenticated && this.userRoles.includes(allowedRoles)) {
      return true; // Usuario está autenticado, permite el acceso.
    } else {
      return false; // No permite el acceso.
    }
  }
}
