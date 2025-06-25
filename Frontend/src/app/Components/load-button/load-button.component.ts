import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-load-button',
  templateUrl: './load-button.component.html',
  styleUrls: ['./load-button.component.scss']
})
export class LoadButtonComponent {
  @Input() totalPages: number = 0;
  @Input() currentPage: number = 0;
  @Output() newPage = new EventEmitter<number>();
  goToPageNumber: string | null = null;

  onPageClick(page: number) {
    if (page >= 1 && page <= this.totalPages && page !== this.currentPage) {
      // Emit the new page number only if it's different from the current page
      console.log(`Changing to page: ${page}`);
      this.currentPage = page;
      this.newPage.emit(page);
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      // Increment the current page if it is less than the total pages
      this.currentPage++;
      this.newPage.emit(this.currentPage);
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      // Decrement the current page if it is greater than 1
      this.currentPage--;
      this.newPage.emit(this.currentPage);
    }
  }

  goToPage() {
    // Validate the input and ensure it is a number within the valid range
    const pageNumber = parseInt(this.goToPageNumber || '', 10);
    if (this.goToPageNumber && pageNumber >= 1 && pageNumber <= this.totalPages) {
      // If the input is valid, set the current page and emit the new page number
      this.goToPageNumber = ''; // Reset the input field after navigating
      this.currentPage = pageNumber;
      this.newPage.emit(pageNumber);
    }
    else if (this.goToPageNumber && pageNumber < 1) {
      // If the input is less than 1, reset to the first page
      this.goToPageNumber = ''; // Reset the input field
      this.currentPage = 1;
      this.newPage.emit(1);
    }
    else if (this.goToPageNumber && pageNumber > this.totalPages) {
      // If the input is greater than total pages, reset to the last page
      this.goToPageNumber = ''; // Reset the input field
      this.currentPage = this.totalPages;
      this.newPage.emit(this.totalPages);
    }
    else {
      // If the input is invalid, reset the goToPageNumber
      this.goToPageNumber = '';
    }
  }

  get pages(): number[] {
    // Generate an array of page numbers based on the current page and total pages
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
