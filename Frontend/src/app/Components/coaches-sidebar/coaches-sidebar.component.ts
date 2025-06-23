import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-coaches-sidebar',
  templateUrl: './coaches-sidebar.component.html',
  styleUrl: './coaches-sidebar.component.scss'
})
export class CoachesSidebarComponent {
  @Input() viewMode: 'grid' | 'list' = 'grid';
  @Output() viewModeChange = new EventEmitter<'grid' | 'list'>();

  changeViewMode(mode: 'grid' | 'list') {
    this.viewModeChange.emit(mode);
  }

}
