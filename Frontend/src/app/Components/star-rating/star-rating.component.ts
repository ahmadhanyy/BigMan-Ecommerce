import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IProduct } from '../../Interfaces/iproduct';
import { ICoach } from '../../Interfaces/icoach';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.scss']
})
export class StarRatingComponent {
  @Input() coachCard!: ICoach;
  @Input() prodCard!: IProduct;
  @Input() prodReviewId!: number;
  @Input() coachReviewId!: number;
  rating: number = 0;
  ratersNumber: number = 0;
  @Input() size: string = "17px";
  @Input() color: string = "black";
  @Input() showRatersNumber: boolean = true; // Add a flag to show/hide raters number
  @Output() ratingUpdated = new EventEmitter<number>();
  starCount: number = 5;
  stars: boolean[] = [];

  constructor(){}

  ngOnInit() {
/*     if(this.coachCard){
      this.rating = this.reviewService.calcRatingAverage(this.coachCard.id!, false);
      this.ratersNumber = this.reviewService.calcRatersNumber(this.coachCard.id!, false);
    }
    if(this.prodCard){
      this.rating = this.reviewService.calcRatingAverage(this.prodCard.id!, true);
      this.ratersNumber = this.reviewService.calcRatersNumber(this.prodCard.id!, true);
    }
    if(this.prodReviewId){
      this.rating = this.reviewService.getReviewById(this.prodReviewId)?.rating!;
    }
    if(this.coachReviewId){
      this.rating = this.reviewService.getReviewById(this.coachReviewId)?.rating!;
    }
    this.stars = Array(this.starCount).fill(false); */
  }

  showIcon(index: number) {
    return this.rating >= index + 1 ? '★' : '☆';
  }
}
