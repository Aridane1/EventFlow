import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-card-search',
  templateUrl: './card-search.component.html',
  styleUrls: ['./card-search.component.scss'],
})
export class CardSearchComponent implements OnInit {
  @Input() location: any;
  @Output() locationId = new EventEmitter<number>();
  constructor() {}

  ngOnInit() {}
  //dependiendo de que boton muestra el container-text
  open(location: any) {
    location.showText = !location.showText;
  }
  subscribe(id: any) {
    this.locationId.emit(id);
  }
}
