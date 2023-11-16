import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-add-administrator',
  templateUrl: './add-administrator.page.html',
  styleUrls: ['./add-administrator.page.scss'],
})
export class AddAdministratorPage implements OnInit {
  registerAdminForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {
    this.registerAdminForm = this.formBuilder.group({
      name: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.required],
    });
  }
  ngOnInit() {
    this.registerAdminForm.reset();
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

    this.authService.registerAdmin(user).subscribe((data) => {
      this.registerAdminForm.reset();
    });
  }
}
