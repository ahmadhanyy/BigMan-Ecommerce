import { Component } from '@angular/core';

@Component({
  selector: 'app-coaches',
  templateUrl: './coaches.component.html',
  styleUrl: './coaches.component.scss'
})
export class CoachesComponent {
  viewMode: 'grid' | 'list' = 'grid';
  sortBy: string = '';
  currentPage: number = 1;

  setViewMode(mode: 'grid' | 'list') {
    this.viewMode = mode;
  }

  setSorting(sort: string){
    this.sortBy = sort;
  }

  setCurrentPage(page: number) {
    this.currentPage = page;
  }

}
