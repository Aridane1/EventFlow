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
import { jwtDecode } from 'jwt-decode';
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
    const decode = jwtDecode(token) as any;
    this.userRol = decode.rol;

    if (isAuthenticated && allowedRoles.includes(this.userRol)) {
      return true;
    } else {
      return false;
    }
  }
}
