import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment';
import { UserService } from './user.service';
import { IOrder } from '../Interfaces/iorder';
import { DeliveryStatus, ICartItem } from '../Interfaces/icart-item';
import { IAddress } from '../Interfaces/iaddress';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  apiUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient,
              private userService: UserService) {}

  private getHeaders(): HttpHeaders {
    const token = this.userService.getToken(); // Ensure the JWT token is available
    if (!token) {
      throw new Error('No token found');
    }
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  getAllOrders(currentPage: number): Observable<any> {
    const headers = this.getHeaders();
    return this.httpClient.get<any>(`${this.apiUrl}/orders?populate=*&pagination[page]=${currentPage}&pagination[pageSize]=20&sort=createdAt:desc`, { headers });
  }

  getPendingOrders(email: string): Observable<IOrder> {
    const headers = this.getHeaders();
    return this.httpClient.get<{ data: IOrder }>(`${this.apiUrl}/orders?populate=*&filters[email][$eq]=${email}&filters[orderStatus][$eq]=pending`, { headers }).pipe(
      map(response => response.data)
    );
  }

  getOrdersByEmail(email: string, currentPage: number): Observable<any> {
    const headers = this.getHeaders();
    return this.httpClient.get<any>(`${this.apiUrl}/orders?populate=*&filters[email][$eq]=${email}&pagination[page]=${currentPage}&pagination[pageSize]=10`, { headers });
  }

  addOrder(email: string, cartItems: ICartItem[], address: IAddress, orderDate: Date, deliveryDate: Date, orderStatus: DeliveryStatus, cost: number, paymentMethod: string, cardNumber: string, cardHolder: string, cardExpiryDate: Date, cvv: number): Observable<IOrder> {
    const headers = this.getHeaders();
    if(cardNumber && cardHolder && cardExpiryDate && cvv){
      const order = {
        data: {
          email,
          orderDate,
          deliveryDate,
          orderStatus,
          cost,
          paymentMethod,
          cardNumber,
          cardHolder,
          cardExpiryDate,
          cvv,
          address: address,
          cart_items: {
            connect: cartItems.map(item => ({ id: item.id }))
          }
        }
      };
      return this.httpClient.post<IOrder>(`${this.apiUrl}/orders`, order, { headers });
    }else{
      const order = {
        data: {
          email,
          orderDate,
          deliveryDate,
          orderStatus,
          cost,
          paymentMethod,
          address: address,
          cart_items: {
            connect: cartItems.map(item => ({ id: item.id }))
          }
        }
      };
      return this.httpClient.post<IOrder>(`${this.apiUrl}/orders`, order, { headers });
    }
  }

  deleteOrder(orderDocId: string): Observable<any> {
    const headers = this.getHeaders();
    return this.httpClient.delete(`${this.apiUrl}/orders/${orderDocId}`, { headers });
  }
}
