import { Component, Input, OnInit } from '@angular/core';
import { ReviewService } from '../../Services/review.service';
import { IProduct } from '../../Interfaces/iproduct';
import { ICoach } from '../../Interfaces/icoach';
import { IReview } from '../../Interfaces/ireview';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.scss'
})
export class ReviewsComponent {
  @Input() prodCard!: IProduct;
  @Input() coachCard!: ICoach;
  rating: number = 0;
  ratersNumber: number = 0;
  prodReviews: IReview[] = [];
  coachReviews: IReview[] = [];

  constructor(private reviewService: ReviewService){}

/*   ngOnInit(): void {
    if(this.prodCard){
      this.prodReviews = this.reviewService.getReviewsByProductId(this.prodCard.id!) || [];
      this.ratersNumber = this.reviewService.calcRatersNumber(this.prodCard.id!, true);
      this.rating = this.reviewService.calcRatingAverage(this.prodCard.id!, true);
    }
    else if(this.coachCard){
      this.coachReviews = this.reviewService.getReviewsByCoachId(this.coachCard.id!) || [];
      this.ratersNumber = this.reviewService.calcRatersNumber(this.coachCard.id!, false);
      this.rating = this.reviewService.calcRatingAverage(this.coachCard.id!, false);
    }
    if(this.ratersNumber == 0 || isNaN(this.rating))
      this.rating = 0;
  }

  get ReviewsStatistics(): number[] | undefined {
    if(this.coachCard)
      return this.reviewService.getReviewsStatistics(this.coachCard.id!, false);
    else
    return this.reviewService.getReviewsStatistics(this.prodCard.id!, true);
  }

  getPercentage(count: number): number {
    return (count / this.ratersNumber) * 100;
  }

  getReviews() : IReview[] | undefined {
    if(this.coachCard)
      return this.reviewService.getReviewsByCoachId(this.coachCard.id!) || [];
    else
    return this.reviewService.getReviewsByProductId(this.prodCard.id!) || [];
  }

  showMoreReviews(){
  } */

}
