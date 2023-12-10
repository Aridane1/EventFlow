import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.page.html',
  styleUrls: ['./admin-page.page.scss'],
})
export class AdminPagePage implements OnInit {
  theme: any;

  constructor(private authServie: AuthService, private storage: Storage) {}

  async ngOnInit() {
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

  closeSession() {
    this.authServie.logout();
  }
}
