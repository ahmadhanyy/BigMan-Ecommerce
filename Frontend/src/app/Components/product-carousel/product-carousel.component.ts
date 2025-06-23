import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { IProduct } from '../../Interfaces/iproduct';

@Component({
  selector: 'app-product-carousel',
  templateUrl: './product-carousel.component.html',
  styleUrl: './product-carousel.component.scss'
})
export class ProductCarouselComponent {
  @Input() products: IProduct[] = [];
  @ViewChild('prodsWrapper') prodsWrapper!: ElementRef<HTMLDivElement>;
  @Input() textOnList: string = '';

  scroll(direction: string) {
    if (direction == 'left') {
      this.prodsWrapper.nativeElement.scrollBy({
        left: -880, // Scroll 4 cards to the left (assuming each card is 220px wide)
        behavior: 'smooth'
      });
    }
    else{
      this.prodsWrapper.nativeElement.scrollBy({
        left: 880, // Scroll 4 cards to the left (assuming each card is 220px wide)
        behavior: 'smooth'
      });
    }
  }

}
