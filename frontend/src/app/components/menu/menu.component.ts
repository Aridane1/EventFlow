import { Component, Input, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { PopoverComponent } from './popover/popover.component';
import { Storage } from '@ionic/storage-angular';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  showMenu = false;
  @Input() mode: any;
  rol: any = '';
  constructor(
    private authService: AuthService,
    private storage: Storage,
    public popoverController: PopoverController
  ) {}

  async ngOnInit() {
    let token = await this.storage.get('token');
    this.rol = jwtDecode(token) as any;
  }

  switch() {
    this.showMenu = !this.showMenu;
    document.querySelector('.nav-menu')?.classList.toggle('show');
  }

  logout() {
    this.authService.logout();
  }
  async showOptionsPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: PopoverComponent,
      event: ev,
      translucent: true,
    });
    return await popover.present();
  }
}
