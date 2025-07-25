import { Component, Input } from '@angular/core';
import { IOrder } from '../../Interfaces/iorder';

@Component({
  selector: 'app-order-list-card',
  templateUrl: './order-list-card.component.html',
  styleUrl: './order-list-card.component.scss'
})
export class OrderListCardComponent {
  @Input() order!: IOrder;

  editOrder(){}

  removeOrder(){}
}
