import { Component } from '@angular/core';
import { OrderService } from '../../Services/order.service';
import { ViewportScroller } from '@angular/common';
import { IOrder } from '../../Interfaces/iorder';

@Component({
  selector: 'app-admin-order',
  templateUrl: './admin-order.component.html',
  styleUrl: './admin-order.component.scss'
})
export class AdminOrderComponent {
  orders: IOrder[] = [];
  isLoading: boolean = true;
  currentPage: number = 1;
  totalPages: number = 1;

  constructor(private orderService: OrderService, private viewportScroller: ViewportScroller) {}

  ngOnInit(): void {
    this.fetchOrders(this.currentPage);
  }

  fetchOrders(pageNumber: number){
    this.orderService.getAllOrders(pageNumber).subscribe(
      (res) => {
        this.isLoading = false;
        console.log('res: ', res)
        this.orders = res.data;
        this.currentPage = res.meta.pagination.page;
        this.totalPages = res.meta.pagination.pageCount;
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
    this.fetchOrders(newPage);
  }
}
