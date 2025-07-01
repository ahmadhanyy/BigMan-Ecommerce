import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-coaches-sidebar',
  templateUrl: './coaches-sidebar.component.html',
  styleUrl: './coaches-sidebar.component.scss'
})
export class CoachesSidebarComponent {
  @Input() viewMode: 'grid' | 'list' = 'grid';
  @Output() viewModeChange = new EventEmitter<'grid' | 'list'>();
  @Output() sortChange = new EventEmitter<string>();
  sortBy: string = '';

  changeViewMode(mode: 'grid' | 'list') {
    this.viewModeChange.emit(mode);
  }

  onSortChange(event: Event) {
    // Emit the selected sort value
    const value = (event.target as HTMLSelectElement).value;
    this.sortBy = value;
    this.sortChange.emit(this.sortBy);
  }

}
