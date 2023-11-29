import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage-angular';
import { firstValueFrom } from 'rxjs';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-administrator',
  templateUrl: './add-administrator.page.html',
  styleUrls: ['./add-administrator.page.scss'],
})
export class AddAdministratorPage implements OnInit {
  registerAdminForm: FormGroup;
  users: any;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private storage: Storage
  ) {
    this.registerAdminForm = this.formBuilder.group({
      name: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.required],
    });
  }
  ngOnInit() {
    this.registerAdminForm.reset();
    this.getAllUsers();
  }
  async getAllUsers() {
    let token = await this.storage.get('token');
    this.users = await firstValueFrom(this.authService.getAllUser(token));
  }
  registerAdmin() {
    const name = this.registerAdminForm.get('name')?.value;
    const email = this.registerAdminForm.get('email')?.value;
    const password = this.registerAdminForm.get('password')?.value;

    let user: User = {
      email: email,
      password: password,
      name: name,
      rol: 'admin',
    };
    if (!this.registerAdminForm.valid) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Falta algun campo por rellenar',
        heightAuto: false,
      });
      return;
    }

    const emailExists = this.users.some(
      (existingUser: any) => existingUser.email === user.email
    );
    console.log(emailExists);
    if (emailExists) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: `El usuario con el email ${user.email} ya existe.`,
        heightAuto: false,
      });
    } else {
      this.authService.registerAdmin(user).subscribe((data: any) => {
        Swal.fire({
          icon: 'success',
          title: 'Great!!',
          text: `El usuario con email ${email} se ha registrado correctamente`,
          heightAuto: false,
        });
        this.registerAdminForm.reset();
      });
    }
  }
}
