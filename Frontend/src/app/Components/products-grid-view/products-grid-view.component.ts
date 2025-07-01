import { Component, Input } from '@angular/core';
import { IProduct } from '../../Interfaces/iproduct';

@Component({
  selector: 'app-products-grid-view',
  templateUrl: './products-grid-view.component.html',
  styleUrl: './products-grid-view.component.scss'
})
export class ProductsGridViewComponent {
  @Input() products: IProduct[][] = [];
}
