import { Component, OnInit } from '@angular/core';
import { IOrder } from '../../Interfaces/iorder';
import { OrderService } from '../../Services/order.service';
import { UserService } from '../../Services/user.service';
import { ModalService } from '../../Services/modal.service';
import { CartItemService } from '../../Services/cart-item.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent implements OnInit {
  apiUrl = environment.imageApi;
  ordersList: IOrder[] = [];

  constructor(private orderService: OrderService,
              private userService: UserService,
              private cartService: CartItemService,
              private modalService: ModalService) {}

  ngOnInit(): void {
    this.userService.loggedUserEmail$.subscribe(email => {
      if (email) {
        this.orderService.getOrdersByEmail(email).subscribe({
          next: (orders) => {
            this.ordersList = orders;
            console.log('Orders fetched successfully:', this.ordersList);
          },
          error: (error) => {
            console.error('Error fetching orders:', error);
          }
        });
      }
    });
  }

}
