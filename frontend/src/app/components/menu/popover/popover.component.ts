import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { jwtDecode } from 'jwt-decode';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
})
export class PopoverComponent implements OnInit {
  rol: any;
  constructor(
    private popoverController: PopoverController,
    private router: Router,
    private authService: AuthService,
    private sorage: Storage
  ) {}

  async ngOnInit() {
    let token = await this.sorage.get('token');

    let user = jwtDecode(token) as any;
    this.rol = user.rol;
  }
  changeMode() {
    this.router.navigateByUrl('/change-mode');
    this.popoverController.dismiss();
  }

  logout() {
    // Agrega aquí la lógica para cerrar sesión
    this.authService.logout();
    this.popoverController.dismiss();
  }
}
