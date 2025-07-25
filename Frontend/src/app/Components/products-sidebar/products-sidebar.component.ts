import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-products-sidebar',
  templateUrl: './products-sidebar.component.html',
  styleUrls: ['./products-sidebar.component.scss']
})
export class ProductsSidebarComponent {
  @Output() sortChange = new EventEmitter<string>();
  @Output() filterChange = new EventEmitter<any>();
  sortBy: string = '';
  minPrice: number = 0;
  maxPrice: number = 1000000;
  freeShipping: boolean = false;
  hasDiscount: boolean = false;

  onSortChange(event: Event) {
    // Emit the selected sort value
    const value = (event.target as HTMLSelectElement).value;
    this.sortBy = value;
    this.sortChange.emit(this.sortBy);
  }

  applyFilters() {
    // Emit the current filter values
    this.filterChange.emit({
      minPrice: this.minPrice,
      maxPrice: this.maxPrice,
      freeShipping: this.freeShipping,
      discount: this.hasDiscount
    });
  }
}
