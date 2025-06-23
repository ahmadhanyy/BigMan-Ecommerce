import { Component, OnInit } from '@angular/core';
import { IProduct } from '../../Interfaces/iproduct';
import { ProductService } from '../../Services/product.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products-list-view',
  templateUrl: './products-list-view.component.html',
  styleUrl: './products-list-view.component.scss'
})
export class ProductsListViewComponent implements OnInit {
  prodsList: IProduct[] = [];
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
        this.prodsList = response.data;  // Fetch products based on category
      });
    } else {
      this.prodService.getProducts().subscribe((response: any) => {
        this.prodsList = response.data;  // Load all products
      });
    }
  }
}
