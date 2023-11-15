import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input() event: any;
  @Input() mode: any;
  @Output() change = new EventEmitter<any>();
  constructor() {}

  ngOnInit() {}

  deleteOneEvent(id: number) {
    this.change.emit(id);
  }
}
