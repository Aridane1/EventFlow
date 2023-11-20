import { Component, Input, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { firstValueFrom } from 'rxjs';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  textareaActivado: boolean = true;
  mode: any;
  rol: any;
  user: any;
  userInfo: User = {
    name: '',
    email: '',
    password: '',
    profile_picture: '',
    rol: '',
  };
  constructor(private storage: Storage, private authService: AuthService) {}

  async ngOnInit() {
    let token = await this.storage.get('token');
    this.user = await firstValueFrom(this.authService.getUserByToken(token));

    this.userInfo = {
      name: this.user?.user.name ? this.user.user.name : '',
      email: '',
      password: '',
      rol: '',
      profile_picture: this.user?.user.profile_picture
        ? this.user.user.profile_picture
        : '',
    };
  }

  async ionViewWillEnter() {
    let token = await this.storage.get('token');
    const user = await firstValueFrom(this.authService.getUserByToken(token));
    this.rol = user.user.rol;
  }

  openPopup() {
    document.querySelector('.popup')?.classList.toggle('hidden');
  }
  closePopup() {
    document.querySelector('.popup')?.classList.remove('hidden');
  }

  logout() {
    this.authService.logout();
  }
}
