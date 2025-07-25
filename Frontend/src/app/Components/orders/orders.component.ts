import { Component, OnInit } from '@angular/core';
import { IOrder } from '../../Interfaces/iorder';
import { OrderService } from '../../Services/order.service';
import { UserService } from '../../Services/user.service';
import { ViewportScroller } from '@angular/common';
import { environment } from '../../../environments/environment';
import { UserInformationService } from '../../Services/user-information.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent implements OnInit {
  apiUrl = environment.imageApi;
  ordersList: IOrder[] = [];
  currentPage: number = 1;
  totalPages: number = 1;
  email: string | null = null;

  constructor(private orderService: OrderService,
              private userInfoService: UserInformationService,
              private viewportScroller: ViewportScroller) {}

  ngOnInit(): void {
    this.userInfoService.loggedUserEmail$.subscribe(email => {
      this.email = email;
      if (email) {
        this.fetchOrders(this.currentPage, email);
      }
    });
  }

  fetchOrders(page: number, email: string) {
    this.orderService.getOrdersByEmail(email, page).subscribe({
      next: (res) => {
        this.ordersList = res.data;
        this.currentPage = res.meta.pagination.page;
        this.totalPages = res.meta.pagination.pageCount;
      },
      error: (error) => {
        console.error('Error fetching orders:', error);
      }
    });
  }

  onPageChanged(newPage: number) {
    if(this.email){
      this.viewportScroller.scrollToPosition([0, 0]); // scroll to top
      // Update the current page and fetch products for the new page
      this.fetchOrders(newPage, this.email);
    }
  }

}
