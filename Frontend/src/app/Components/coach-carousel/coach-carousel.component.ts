import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { ICoach } from '../../Interfaces/icoach';

@Component({
  selector: 'app-coach-carousel',
  templateUrl: './coach-carousel.component.html',
  styleUrl: './coach-carousel.component.scss'
})
export class CoachCarouselComponent {
  @Input() coachs: ICoach[] = [];
  @Input() textOnList: string = '';
  @ViewChild('coachsWrapper') coachsWrapper!: ElementRef<HTMLDivElement>;

  scroll(direction: string) {
    if (direction == 'left') {
      this.coachsWrapper.nativeElement.scrollBy({
        left: -880, // Scroll 4 cards to the left (assuming each card is 220px wide)
        behavior: 'smooth'
      });
    }
    else{
      this.coachsWrapper.nativeElement.scrollBy({
        left: 880, // Scroll 4 cards to the left (assuming each card is 220px wide)
        behavior: 'smooth'
      });
    }
  }

}
