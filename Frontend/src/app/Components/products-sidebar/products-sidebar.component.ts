import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-products-sidebar',
  templateUrl: './products-sidebar.component.html',
  styleUrls: ['./products-sidebar.component.scss']
})
export class ProductsSidebarComponent {
  @Input() viewMode: 'grid' | 'list' = 'grid';
  @Output() viewModeChange = new EventEmitter<'grid' | 'list'>();

  changeViewMode(mode: 'grid' | 'list') {
    this.viewModeChange.emit(mode);
  }
}
