import { Component, OnInit } from '@angular/core';
import { ICoach } from '../../Interfaces/icoach';
import { CoachService } from '../../Services/coach.service';
import { IProduct } from '../../Interfaces/iproduct';
import { ProductService } from '../../Services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  coachesList: ICoach[] = [];
  productsList: IProduct[] = [];
  textOnProdList: string = 'Big Saves New Collection';
  textOnCoachList: string = 'Top Rated Trainers';
  isProdLoading: boolean = true;
  isCoachLoading: boolean = true;

  constructor(private coachService: CoachService, private prodService: ProductService) {}

  ngOnInit(): void {
    this.coachService.getCoaches(1).subscribe(
      (response: any) => {
        this.isCoachLoading = false;
        this.coachesList = response.data;
      },
      (error: any) => {
        this.isCoachLoading = true;
        console.error('Error fetching coaches:', error);
      }
    );
    this.prodService.getDiscountByCategory('Clothes').subscribe(
      (response: any) => {
        this.isProdLoading = false;
        this.productsList = response.data;
      },
      (error: any) => {
        this.isProdLoading = true;
        console.error('Error fetching products:', error);
      }
    );

  }
}
