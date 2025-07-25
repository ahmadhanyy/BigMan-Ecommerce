import { Component } from '@angular/core';
import { BranchService } from '../../Services/branch.service';
import { IBranch } from '../../Interfaces/ibranch';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-admin-branch',
  templateUrl: './admin-branch.component.html',
  styleUrl: './admin-branch.component.scss'
})
export class AdminBranchComponent {
  branches: IBranch[] = [];
  isLoading: boolean = true;
  currentPage: number = 1;
  totalPages: number = 1;

  constructor(private branchService: BranchService, private viewportScroller: ViewportScroller) {}

  ngOnInit(): void {
    this.fetchBranches(this.currentPage);
  }

  fetchBranches(pageNumber: number){
    this.branchService.getBranches().subscribe(
      (res: any) => {
        console.log('res: ', res);
        this.isLoading = false;
        this.branches = res.data;
        this.currentPage = res.meta.pagination.page;
        this.totalPages = res.meta.pagination.pageCount;
      },
      (err) => {
        this.isLoading = true;
        console.error(err);
      }
    );
  }

  setCurrentPage(page: number) {
    this.currentPage = page;
  }

  onPageChanged(newPage: number) {
    this.viewportScroller.scrollToPosition([0, 0]);
    this.fetchBranches(newPage);
  }
}
