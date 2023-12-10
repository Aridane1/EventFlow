import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { firstValueFrom } from 'rxjs';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

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
      rol: null,
      email: email,
      password: password,
    };

    this.authService.login(user).subscribe(
      async (res) => {
        let user: any = res;
        let rol = user.user.rol;

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
        console.log(err);
        this.alert(err);
      }
    );
  }

  alert(err: any) {
    if (err.status === 0) {
      Swal.fire({
        position: 'top',
        icon: 'error',
        title: 'Error de conexción',
        showConfirmButton: false,
        timer: 1500,
        heightAuto: false,
      });
      return;
    }
    if (err.status === 500) {
      Swal.fire({
        position: 'top',
        icon: 'error',
        title: 'El usuario o la contraseña están mal',
        showConfirmButton: false,
        timer: 1500,
        heightAuto: false,
      });
      return;
    }
  }
}
