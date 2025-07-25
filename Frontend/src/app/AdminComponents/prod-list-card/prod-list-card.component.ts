import { Component, Input } from '@angular/core';
import { IProduct } from '../../Interfaces/iproduct';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-prod-list-card',
  templateUrl: './prod-list-card.component.html',
  styleUrl: './prod-list-card.component.scss'
})
export class ProdListCardComponent {
  apiUrl = environment.imageApi;
  @Input() card!: IProduct;
  userEmail : string | null = null;

  constructor() {}

  editProd(){}
}
