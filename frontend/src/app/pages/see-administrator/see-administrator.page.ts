import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-see-administrator',
  templateUrl: './see-administrator.page.html',
  styleUrls: ['./see-administrator.page.scss'],
})
export class SeeAdministratorPage implements OnInit {
  users: any;
  token: any;
  constructor(private authService: AuthService, private storage: Storage) {}

  async ngOnInit() {
    this.getAllUser();
    this.token = await this.storage.get('token');
  }

  async getAllUser() {
    let token = await this.storage.get('token');
    this.authService.getAllUser(token).subscribe((data) => {
      this.users = data;
      for (let index = 0; index < this.users.length; index++) {
        this.users[index].isAdmin = false;
        if (this.users[index].rol == 'admin') {
          this.users[index].isAdmin = true;
        }
      }
    });
  }

  removeOrAddAdmin(user: User) {
    if (user.isAdmin) {
      user.rol = 'customer';
      this.authService.changeRol(user, this.token).subscribe((data) => {
        console.log(data);
      });
    } else {
      user.rol = 'admin';
      this.authService.changeRol(user, this.token).subscribe((data) => {
        console.log(data);
      });
    }
  }
}
