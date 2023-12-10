import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit() {}

  register() {
    const name = this.registerForm.get('name')?.value;
    const email = this.registerForm.get('email')?.value;
    const password = this.registerForm.get('password')?.value;

    let user: User = {
      email: email,
      password: password,
      name: name,
      rol: 'customer',
    };

    this.authService.register(user).subscribe(
      (res) => {
        this.router.navigateByUrl('/events');
        Swal.fire({
          position: 'top',
          icon: 'success',
          title: 'Te has registrado correctamente',
          showConfirmButton: false,
          timer: 1500,
          heightAuto: false,
        });
      },
      (err) => {
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
    if (err.status === 400) {
      Swal.fire({
        position: 'top',
        icon: 'error',
        title: 'Falta algun campo por rellenar',
        showConfirmButton: false,
        timer: 1500,
        heightAuto: false,
      });
      return;
    }
  }
}
