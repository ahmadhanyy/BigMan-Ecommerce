import { Component, OnChanges, OnInit } from '@angular/core';
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

  constructor(public prodService: ProductService, private route: ActivatedRoute, private viewportScroller: ViewportScroller) {}

  ngOnChanges(): void {
    if ((this.prodCatId !== null) || this.query || this.sortOption || Object.keys(this.filters).length > 0) {
      this.fetchSpecialProducts(this.prodCatId!, this.sortOption, this.query, this.filters, this.currentPage);
    }
  }

  ngOnInit(): void {
    const routSub = this.route.paramMap.subscribe(params => {
      this.query = params.get('query') || '';
      this.prodCatId = Number(params.get('category')) || null;
      this.fetchSpecialProducts(this.prodCatId!, this.sortOption, this.query, this.filters, this.currentPage);
    });
  }

  fetchSpecialProducts(categoryId: number, sort: string, query:string, filters: any, page: number) {
    const params = {
      sort: sort,
      query: query,
      filters: filters
    }
    const prodSub = this.prodService.getSpecialProducts(params, categoryId, page).subscribe(
      (res: any) => {
        if(this.viewMode === 'grid'){
          this.prodRows = this.prodService.convertListTo2DList(res.data, 4);
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
        console.error('Error fetching products :', error);
      }
    );
  }

  setViewMode(mode: 'grid' | 'list') {
    this.viewMode = mode;
  }

  setSorting(sort: string){
    this.sortOption = sort;
    this.fetchSpecialProducts(this.prodCatId!, this.sortOption, this.query, this.filters, this.currentPage);
  }

  setFilers(filters: any){
    this.filters = filters;
    this.fetchSpecialProducts(this.prodCatId!, this.sortOption, this.query, this.filters, this.currentPage);
  }

  setCurrentPage(page: number) {
    this.currentPage = page;
  }

  onPageChanged(newPage: number) {
    this.viewportScroller.scrollToPosition([0, 0]);
    this.fetchSpecialProducts(this.prodCatId!, this.sortOption, this.query, this.filters, newPage);
  }


}
