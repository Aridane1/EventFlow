import { Component, Input, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { PopoverComponent } from './popover/popover.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  showMenu = false;
  @Input() mode: any;
  constructor(
    private authService: AuthService,
    public popoverController: PopoverController
  ) {}

  ngOnInit() {}

  switch() {
    this.showMenu = !this.showMenu;
    document.querySelector('.nav-menu')?.classList.toggle('show');
  }

  logout() {
    this.authService.logout();
  }
  async mostrarOpcionesPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: PopoverComponent,
      event: ev,
      translucent: true,
    });
    return await popover.present();
  }
}
