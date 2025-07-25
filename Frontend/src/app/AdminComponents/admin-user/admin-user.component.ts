import { ViewportScroller } from '@angular/common';
import { Component } from '@angular/core';
import { UserService } from '../../Services/user.service';
import { IUser } from '../../Interfaces/iuser';

@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrl: './admin-user.component.scss'
})
export class AdminUserComponent {
  users: IUser[] = [];
  isLoading: boolean = true;
  currentPage: number = 1;
  totalPages: number = 1;

  constructor(private userService: UserService, private viewportScroller: ViewportScroller) {}

  ngOnInit(): void {
    this.fetchUsers(this.currentPage);
  }

  fetchUsers(pageNumber: number){
    this.userService.getAllUsers(pageNumber).subscribe(
      (res) => {
        this.isLoading = false;
        console.log('res: ', res)
        this.users = res;
        //this.users = res.data;
        //this.currentPage = res.meta.pagination.page;
        //this.totalPages = res.meta.pagination.pageCount;
      },
      (err) => {
        this.isLoading = true;
        console.error(err);
      }
    )
  }

  setCurrentPage(page: number) {
    this.currentPage = page;
  }

  onPageChanged(newPage: number) {
    this.viewportScroller.scrollToPosition([0, 0]);
    this.fetchUsers(newPage);
  }
}
