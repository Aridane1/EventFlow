import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { firstValueFrom } from 'rxjs';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { UserRolService } from 'src/app/services/user-rol.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  userRoles: any;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private storage: Storage,
    private userRolService: UserRolService,
    private alertController: AlertController
  ) {
    this.storage.create();
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit() {}

  login() {
    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;

    let user: User = {
      name: null,
      email: email,
      password: password,
    };

    this.authService.login(user).subscribe(
      async (res) => {
        let rol = await this.storage.get('rol');
        if (rol.includes('manager')) {
          this.router.navigateByUrl('/admin-page');
        }
        if (rol.includes('admin')) {
          this.router.navigateByUrl('/home');
        }
        if (rol.includes('customer')) {
          this.router.navigateByUrl('/events');
        }

        this.loginForm.reset();
      },
      (err) => {
        this.presentAlert(err.message || 'Error');
      }
    );
  }

  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Error',
      subHeader: message,
      message: 'Could not login. Try again.',
      buttons: ['OK'],
    });

    await alert.present();
  }
}
