import { Component, OnInit, Input } from '@angular/core';
import { IProduct } from '../../Interfaces/iproduct';
import { ProductService } from '../../Services/product.service';
import { ActivatedRoute } from '@angular/router';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-products-grid-view',
  templateUrl: './products-grid-view.component.html',
  styleUrl: './products-grid-view.component.scss'
})
export class ProductsGridViewComponent implements OnInit  {
  prodRows: IProduct[][] = [];
  prodCatId: number | null = null;
  currentPage: number = 1;
  totalPages: number = 1;

  constructor(public prodService: ProductService, private route: ActivatedRoute, private viewportScroller: ViewportScroller) {}

  ngOnInit(): void {
    // Subscribe to route parameters to determine if an id is passed
    this.route.paramMap.subscribe((params) => {
      // Extract product category ID, if present, otherwise it will be null
      this.prodCatId = Number(params.get('category')) || null;
      this.fetchProducts(this.currentPage);
    });
  }

  fetchProducts(page: number) {
    if (this.prodCatId) {
      this.prodService.getProductsByCatId(this.prodCatId, page).subscribe((res: any) => {
        this.prodRows = this.prodService.convertListTo2DList(res.data, 4);
        this.currentPage = res.meta.pagination.page;
        this.totalPages = res.meta.pagination.pageCount;
      });
    } else {
      this.prodService.getProducts(page).subscribe((res: any) => {
        this.prodRows = this.prodService.convertListTo2DList(res.data, 4);
        this.currentPage = res.meta.pagination.page;
        this.totalPages = res.meta.pagination.pageCount;
      });
    }
  }


  onPageChanged(newPage: number) {
    this.viewportScroller.scrollToPosition([0, 0]); // scroll to top
    // Update the current page and fetch products for the new page
    this.fetchProducts(newPage);
  }
}
