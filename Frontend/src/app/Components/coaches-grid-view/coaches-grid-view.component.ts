import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { ICoach } from '../../Interfaces/icoach';
import { CoachService } from '../../Services/coach.service';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-coaches-grid-view',
  templateUrl: './coaches-grid-view.component.html',
  styleUrl: './coaches-grid-view.component.scss'
})
export class CoachesGridViewComponent implements OnInit, OnChanges {
  @Input() sortOption: string = '';
  @Input() currentPage: number = 1;
  @Output() pageChange = new EventEmitter<number>();
  coachRows: ICoach[][] = [];
  totalPages: number = 1;

  constructor(public coachService: CoachService, private viewportScroller: ViewportScroller) {}

  ngOnChanges(): void {
    if (this.sortOption) {
      this.fetchCoaches(this.sortOption, this.currentPage);
    }
  }

  ngOnInit(): void {
    this.fetchCoaches(this.sortOption, this.currentPage);
  }

  fetchCoaches(sort: string, page: number) {
    this.coachService.getSortedCoaches(sort, page).subscribe((res: any) => {
      this.coachRows = this.coachService.convertListTo2DList(res.data, 4);
      this.currentPage = res.meta.pagination.page;
      this.totalPages = res.meta.pagination.pageCount;
    },
    (error) => {
      console.error('Error fetching coaches:', error);
    });
  }

  onPageChanged(newPage: number) {
    this.viewportScroller.scrollToPosition([0, 0]); // scroll to top
    this.pageChange.emit(newPage);
    this.fetchCoaches(this.sortOption, this.currentPage);
  }

}
