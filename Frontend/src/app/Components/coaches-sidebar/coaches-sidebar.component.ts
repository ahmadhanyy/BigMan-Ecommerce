import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-coaches-sidebar',
  templateUrl: './coaches-sidebar.component.html',
  styleUrl: './coaches-sidebar.component.scss'
})
export class CoachesSidebarComponent {
  @Output() sortChange = new EventEmitter<string>();
  sortBy: string = '';

  onSortChange(event: Event) {
    // Emit the selected sort value
    const value = (event.target as HTMLSelectElement).value;
    this.sortBy = value;
    this.sortChange.emit(this.sortBy);
  }

}
