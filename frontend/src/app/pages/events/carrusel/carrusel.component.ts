import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-carrusel',
  templateUrl: './carrusel.component.html',
  styleUrls: ['./carrusel.component.scss'],
})
export class CarruselComponent {
  @Input() events: any;
  slideIndex: number = 1;
  constructor() {
    window.onload = () => {
      this.showSlides(this.slideIndex);
    };
  }

  plusSlides(n: any) {
    this.showSlides((this.slideIndex += n));
  }

  currentSlide(n: any) {
    this.showSlides((this.slideIndex = n));
  }

  showSlides(n: any) {
    let i;
    let slides = document.getElementsByClassName(
      'mySlides'
    ) as HTMLCollectionOf<HTMLElement>;
    if (n > slides.length) {
      this.slideIndex = 1;
    }
    if (n < 1) {
      this.slideIndex = slides.length;
    }
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = 'none';
    }

    slides[this.slideIndex - 1].style.display = 'block';
  }
}
