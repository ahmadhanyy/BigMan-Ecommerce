import { Component, OnInit } from '@angular/core';
import { ICoach } from '../../Interfaces/icoach';
import { CoachService } from '../../Services/coach.service';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-coaches-list-view',
  templateUrl: './coaches-list-view.component.html',
  styleUrl: './coaches-list-view.component.scss'
})
export class CoachesListViewComponent implements OnInit {
  coachesList: ICoach[] = [];
  currentPage: number = 1;
  totalPages: number = 1;

  constructor(public coachService: CoachService, private viewportScroller: ViewportScroller) {}

  ngOnInit(): void {
    this.fetchCoaches(this.currentPage);
  }

  fetchCoaches(page: number) {
    this.coachService.getCoaches(page).subscribe((res: any) => {
      this.coachesList = res.data;
      this.currentPage = res.meta.pagination.page;
      this.totalPages = res.meta.pagination.pageCount;
    });
  }


  onPageChanged(newPage: number) {
    this.viewportScroller.scrollToPosition([0, 0]); // scroll to top
    // Update the current page and fetch coaches for the new page
    this.fetchCoaches(newPage);
  }

}
