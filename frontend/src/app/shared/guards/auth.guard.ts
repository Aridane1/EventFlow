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

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  userRol: any;
  constructor(
    private authService: AuthService,
    private router: Router,
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

    if (isAuthenticated && allowedRoles.includes(user.user.rol)) {
      return true;
    } else {
      return false;
    }
  }
}
