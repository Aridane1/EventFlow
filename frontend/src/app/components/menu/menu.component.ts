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
  theme: any;
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
    this.theme = await this.storage.get('mode');
    let html = document.querySelector('html');
    if (this.theme == 'dark') {
      html?.classList.add('dark');
      document.documentElement.style.setProperty('--bg-color', 'rgb(51 65 85)');
    }
    if (this.theme == 'white') {
      html?.classList.remove('dark');
      document.documentElement.style.setProperty('--bg-color', '#a5acb8');
    }
  }

  switch() {
    this.showMenu = !this.showMenu;
    document.querySelector('.nav-menu')?.classList.toggle('show');
  }

  logout() {
    this.authService.logout();
  }
  async themeDark() {
    let mode = await this.storage.set('mode', 'white');
    console.log(mode);
    this.theme = mode;
    let html = document.querySelector('html');
    html?.classList.remove('dark');
    document.documentElement.style.setProperty('--bg-color', '#a5acb8');
  }

  async themeWhite() {
    let mode = await this.storage.set('mode', 'dark');
    console.log(mode);
    this.theme = mode;
    let html = document.querySelector('html');
    html?.classList.add('dark');
    document.documentElement.style.setProperty('--bg-color', 'rgb(51 65 85)');
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
