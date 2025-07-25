import { Component, Input} from '@angular/core';
import { IProduct } from '../../Interfaces/iproduct';

@Component({
  selector: 'app-products-list-view',
  templateUrl: './products-list-view.component.html',
  styleUrl: './products-list-view.component.scss'
})
export class ProductsListViewComponent {
  @Input() products: IProduct[] = [];
  @Input() isLoading: boolean = true;

}
