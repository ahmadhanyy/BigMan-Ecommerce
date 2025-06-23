import { Component, OnChanges, OnInit, Input, SimpleChanges } from '@angular/core';
import { IProduct } from '../../Interfaces/iproduct';
import { ProductService } from '../../Services/product.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products-grid-view',
  templateUrl: './products-grid-view.component.html',
  styleUrl: './products-grid-view.component.scss'
})
export class ProductsGridViewComponent implements OnInit  {
  prodRows: IProduct[][] = [];
  categoryId: number | undefined;

  constructor(public prodService: ProductService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Subscribe to route parameters to determine if a category is passed
    this.route.params.subscribe((params) => {
      this.categoryId = +params['category'];  // Extract category ID
      this.loadProducts();  // Fetch products based on category
    });
  }

  loadProducts(): void {
    if (this.categoryId) {
      this.prodService.getProductsByCatId(this.categoryId).subscribe((response: any) => {
        this.prodRows = this.prodService.convertListTo2DList(response.data, 4);  // Convert to 2D list for grid view
      });
    } else {
      this.prodService.getProducts().subscribe((response: any) => {
        this.prodRows = this.prodService.convertListTo2DList(response.data, 4);  // Load all products
      });
    }
  }
}
