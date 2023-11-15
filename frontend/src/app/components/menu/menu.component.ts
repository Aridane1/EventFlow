import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  showMenu = false;
  @Input() mode: any;
  constructor() {}

  ngOnInit() {}
  switch() {
    this.showMenu = !this.showMenu;
    document.querySelector('.nav-menu')?.classList.toggle('show');
  }
}
