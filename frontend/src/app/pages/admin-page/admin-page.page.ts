import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.page.html',
  styleUrls: ['./admin-page.page.scss'],
})
export class AdminPagePage implements OnInit {
  constructor(private authServie: AuthService) {}

  ngOnInit() {}

  closeSession() {
    this.authServie.logout();
  }
}
