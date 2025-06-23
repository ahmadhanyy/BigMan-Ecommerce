import { Component } from '@angular/core';

@Component({
  selector: 'app-coaches',
  templateUrl: './coaches.component.html',
  styleUrl: './coaches.component.scss'
})
export class CoachesComponent {
  viewMode: 'grid' | 'list' = 'grid'; // Grid view is the default

  setViewMode(mode: 'grid' | 'list') {
    this.viewMode = mode;
  }

}
