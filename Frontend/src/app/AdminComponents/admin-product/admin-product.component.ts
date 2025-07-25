import { Component, OnChanges, OnInit, HostListener } from '@angular/core';
import { IProduct } from '../../Interfaces/iproduct';
import { ProductService } from '../../Services/product.service';
import { ActivatedRoute } from '@angular/router';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrl: './admin-product.component.scss'
})
export class AdminProductComponent {
  sortOption: string = '';
  filters: any = {};
  query: string = '';
  currentPage: number = 1;
  isSearchFound: boolean = true;
  prodList: IProduct[] = []; // For list view
  prodRows: IProduct[][] = []; // For grid view
  prodCatId: number | null = null;
  totalPages: number = 1;
  showSideBar: boolean = true;
  isLoading: boolean = true;

  constructor(public prodService: ProductService, private route: ActivatedRoute, private viewportScroller: ViewportScroller) {}

  ngOnChanges(): void {
    if ((this.prodCatId !== null) || this.query || this.sortOption || Object.keys(this.filters).length > 0) {
      this.fetchSpecialProducts(this.prodCatId!, this.sortOption, this.query, this.filters, this.currentPage);
    }
  }

  ngOnInit(): void {
    if (window.innerWidth <= 1150) {
      this.showSideBar = false;
    }
    else {
      this.showSideBar = true;
    }
    this.checkWindowSize();
    this.route.paramMap.subscribe(params => {
      this.query = params.get('query') || '';
      this.prodCatId = Number(params.get('category')) || null;
      this.fetchSpecialProducts(this.prodCatId!, this.sortOption, this.query, this.filters, this.currentPage);
    });
  }

  // Listen to window resize events
  @HostListener('window:resize', [])
  onResize() {
    this.checkWindowSize();
  }

  checkWindowSize(): void {
    if (window.innerWidth <= 1150) {
      this.showSideBar = false;
    }
    else {
      this.showSideBar = true;
    }
    this.fetchSpecialProducts(this.prodCatId!, this.sortOption, this.query, this.filters, this.currentPage);
  }

  fetchSpecialProducts(categoryId: number, sort: string, query:string, filters: any, page: number) {
    const params = {
      sort: sort,
      query: query,
      filters: filters
    }
    this.prodService.getSpecialProducts(params, categoryId, page).subscribe(
      (res: any) => {
        this.isLoading = false;
        this.prodList = res.data;
        this.currentPage = res.meta.pagination.page;
        this.totalPages = res.meta.pagination.pageCount;
      },
      (error) => {
        this.isLoading = true;
        console.error('Error fetching products :', error);
      }
    );
  }

  setSorting(sort: string){
    this.sortOption = sort;
    this.currentPage = 1;
    this.fetchSpecialProducts(this.prodCatId!, this.sortOption, this.query, this.filters, this.currentPage);
  }

  setFilers(filters: any){
    this.filters = filters;
    this.currentPage = 1;
    this.fetchSpecialProducts(this.prodCatId!, this.sortOption, this.query, this.filters, this.currentPage);
  }

  toggelSideBar() {
    this.showSideBar = !this.showSideBar;
  }

  setCurrentPage(page: number) {
    this.currentPage = page;
  }

  onPageChanged(newPage: number) {
    this.viewportScroller.scrollToPosition([0, 0]);
    this.fetchSpecialProducts(this.prodCatId!, this.sortOption, this.query, this.filters, newPage);
  }

}
