import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-load-button',
  templateUrl: './load-button.component.html',
  styleUrls: ['./load-button.component.scss']
})
export class LoadButtonComponent {
  @Input() totalPages: number = 9;
  @Input() currentPage: number = 4;
  @Output() pageChange = new EventEmitter<number>();
  goToPageNumber: string | null = null;

  onPageClick(page: number) {
    if (page >= 1 && page <= this.totalPages && page !== this.currentPage) {
      this.pageChange.emit(page);
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.pageChange.emit(this.currentPage + 1);
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.pageChange.emit(this.currentPage - 1);
    }
  }

  goToPage() {
    const pageNumber = parseInt(this.goToPageNumber || '', 10);
    if (this.goToPageNumber && pageNumber >= 1 && pageNumber <= this.totalPages) {
      this.pageChange.emit(pageNumber);
    }
    else if (this.goToPageNumber && pageNumber < 1) {
      this.pageChange.emit(1);
    }
    else if (this.goToPageNumber && pageNumber > this.totalPages) {
      this.pageChange.emit(this.totalPages);
    }
    else {
      this.goToPageNumber = '';
    }
  }

  get pages(): number[] {
    const pages = [];
    if (this.totalPages <= 5) {
      for (let i = 1; i <= this.totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (this.currentPage <= 3) {
        pages.push(1, 2, 3, 4, 0, this.totalPages);
      } else if (this.currentPage >= this.totalPages - 2) {
        pages.push(1, 0, this.totalPages - 3, this.totalPages - 2, this.totalPages - 1, this.totalPages);
      } else {
        pages.push(1, 0, this.currentPage - 1, this.currentPage, this.currentPage + 1, 0, this.totalPages);
      }
    }
    return pages;
  }
}
