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
    const allowedRoles: Array<any> = route.data['allowedRoles'] as string[];
    let token = await this.storage.get('token');
    const user = await firstValueFrom(this.authService.getUserByToken(token));
    let userId = user.user.id;

    this.userRoles = await firstValueFrom(
      this.userRolService.getAllUserRolByIdUser(userId)
    );

    if (
      isAuthenticated &&
      allowedRoles.some((role) => this.userRoles.includes(role))
    ) {
      return true; // Usuario está autenticado, permite el acceso.
    } else {
      return false; // No permite el acceso.
    }
  }
}
