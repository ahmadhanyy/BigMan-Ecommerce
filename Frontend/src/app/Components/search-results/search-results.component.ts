import { Component, OnChanges, OnInit, HostListener } from '@angular/core';
import { IProduct } from '../../Interfaces/iproduct';
import { ProductService } from '../../Services/product.service';
import { ActivatedRoute } from '@angular/router';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.scss'
})
export class SearchResultsComponent implements OnInit, OnChanges {
  sortOption: string = '';
  filters: any = {};
  query: string = '';
  viewMode: 'grid' | 'list' = 'grid';
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
        if(this.viewMode === 'grid'){
          if (window.innerWidth <= 1150){
            this.prodRows = this.prodService.convertListTo2DList(res.data, 3);
          }
          else {
            this.prodRows = this.prodService.convertListTo2DList(res.data, 4);
          }
        }
        else{
          this.prodList = res.data;
        }
        if (res.data.length === 0) {
          this.isSearchFound = false;
        }
        else {
          this.isSearchFound = true;
        }
        this.currentPage = res.meta.pagination.page;
        this.totalPages = res.meta.pagination.pageCount;
      },
      (error) => {
        this.isLoading = true;
        console.error('Error fetching products :', error);
      }
    );
  }

  toggelSideBar() {
    this.showSideBar = !this.showSideBar;
  }

  changeViewMode(mode: 'grid' | 'list') {
    this.viewMode = mode;
    this.fetchSpecialProducts(this.prodCatId!, this.sortOption, this.query, this.filters, this.currentPage);
  }

  setSorting(sort: string){
    this.sortOption = sort;
    this.fetchSpecialProducts(this.prodCatId!, this.sortOption, this.query, this.filters, this.currentPage);
    this.showSideBar = false;
  }

  setFilers(filters: any){
    this.filters = filters;
    this.fetchSpecialProducts(this.prodCatId!, this.sortOption, this.query, this.filters, this.currentPage);
    this.showSideBar = false;
  }

  setCurrentPage(page: number) {
    this.currentPage = page;
  }

  onPageChanged(newPage: number) {
    this.viewportScroller.scrollToPosition([0, 0]);
    this.fetchSpecialProducts(this.prodCatId!, this.sortOption, this.query, this.filters, newPage);
  }
}
