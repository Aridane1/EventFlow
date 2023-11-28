import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-popup-image',
  templateUrl: './popup-image.component.html',
  styleUrls: ['./popup-image.component.scss'],
})
export class PopupImageComponent implements OnInit {
  @Input() capturedPhoto: any;
  @Output() closePopup = new EventEmitter<any>();

  constructor() {}

  ngOnInit() {}
  closeImage() {
    this.closePopup.emit();
  }
}
