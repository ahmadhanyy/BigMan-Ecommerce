import { Component } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  viewMode: 'grid' | 'list' = 'grid'; // Grid view is the default

  setViewMode(mode: 'grid' | 'list') {
    this.viewMode = mode;
  }
}
