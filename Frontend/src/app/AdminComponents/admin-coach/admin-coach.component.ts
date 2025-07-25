import { Component, HostListener } from '@angular/core';
import { ICoach } from '../../Interfaces/icoach';
import { ViewportScroller } from '@angular/common';
import { CoachService } from '../../Services/coach.service';

@Component({
  selector: 'app-admin-coach',
  templateUrl: './admin-coach.component.html',
  styleUrl: './admin-coach.component.scss'
})
export class AdminCoachComponent {
  sortOption: string = '';
  currentPage: number = 1;
  coachList: ICoach[] = []; // For list view
  coachRows: ICoach[][] = []; // For grid view
  totalPages: number = 1;
  showSideBar: boolean = true;
  isLoading: boolean = true;

  constructor(private couchService: CoachService, private viewportScroller: ViewportScroller) {}

  ngOnChanges(): void {
    if (this.sortOption) {
      this.fetchSortedCoaches(this.sortOption, this.currentPage);
    }
  }

  ngOnInit(): void {
    if (window.innerWidth <= 1150) {
      this.showSideBar = false;
    }
    else {
      this.showSideBar = true;
    }
    this.checkWindowSize();
    this.fetchSortedCoaches(this.sortOption, this.currentPage);
  }

  // Listen to window resize events
  @HostListener('window:resize', [])
  onResize() {
    this.checkWindowSize();
  }

  checkWindowSize(): void {
    if (window.innerWidth <= 1150) {
      this.showSideBar = false;
    }
    else {
      this.showSideBar = true;
    }
    this.fetchSortedCoaches(this.sortOption, this.currentPage);
  }

  fetchSortedCoaches(sort: string, page: number) {
    this.couchService.getSortedCoaches(sort, page).subscribe(
      (res: any) => {
        this.isLoading = false;
        this.coachList = res.data;
        this.currentPage = res.meta.pagination.page;
        this.totalPages = res.meta.pagination.pageCount;
      },
      (error) => {
        this.isLoading = true;
        console.error('Error fetching products :', error);
      }
    );
  }

  setSorting(sort: string){
    this.sortOption = sort;
    this.currentPage = 1;
    this.fetchSortedCoaches(this.sortOption, this.currentPage);
  }

  toggelSideBar() {
    this.showSideBar = !this.showSideBar;
  }

  setCurrentPage(page: number) {
    this.currentPage = page;
  }

  onPageChanged(newPage: number) {
    this.viewportScroller.scrollToPosition([0, 0]);
    this.fetchSortedCoaches(this.sortOption, this.currentPage);
  }
}
