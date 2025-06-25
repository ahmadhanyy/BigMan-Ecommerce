import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, switchMap, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { ICartItem, DeliveryStatus } from '../Interfaces/icart-item';
import { environment } from '../../environments/environment';
import { UserService } from './user.service';
import { IProduct } from '../Interfaces/iproduct';

@Injectable({
  providedIn: 'root'
})
export class CartItemService {
  apiUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient, private userService: UserService){}

  private getHeaders(): HttpHeaders {
    const token = this.userService.getToken(); // Ensure the JWT token is available
    if (!token) {
      throw new Error('No token found');
    }
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  getCartItems(email: string): Observable<ICartItem[]> {
    const headers = this.getHeaders();
    return this.httpClient.get<{ data: ICartItem[] }>(`${this.apiUrl}/cart-items?filters[email][$eq]=${email}&filters[isOrdered][$eq]=false`, { headers }).pipe(
      map(res => res.data)
    );
  }

  addToCart(email: string, prod: IProduct, count: number, color: string, size: string, deliveryDate:Date, cost: number): Observable<any> {
    const cartItem = {
      data: {
        email: email,
        product: prod,
        prodCount: count,
        color: color,
        size: size,
        deliveryDate: deliveryDate,
        cost: cost,
        isOrdered: false
      }
    };
    const headers = this.getHeaders();
    return this.httpClient.post<ICartItem>(`${this.apiUrl}/cart-items`, cartItem, { headers });
  }

  removeFromCart(itemDocId: string): Observable<any> {
    const headers = this.getHeaders();
    return this.httpClient.delete(`${this.apiUrl}/cart-items/${itemDocId}`, { headers })
  }

  updateItem(cartItem: ICartItem): Observable<ICartItem> {
    const headers = this.getHeaders();
    const updatedItem = {
      data: {
        email: cartItem.email,
        product: cartItem.product,
        prodCount: cartItem.prodCount,
        color: cartItem.color,
        size: cartItem.size,
        deliveryDate: cartItem.deliveryDate,
        deliveryStatus: cartItem.deliveryStatus,
        cost: cartItem.cost,
        isOrdered: cartItem.isOrdered
      }
    }
    return this.httpClient.put<ICartItem>(`${this.apiUrl}/cart-items/${cartItem.documentId}`, updatedItem, { headers });
  }

  clearCart(email: string): Observable<any> {
    const headers = this.getHeaders();
    // First, fetch all cart items for the user and delete them one by one
    return this.getCartItems(email).pipe(
      switchMap((cartItems) => {
        // Loop through all cart items and issue DELETE requests
        const deleteRequests = cartItems.map(item => this.httpClient.delete(`${this.apiUrl}/cart-items/${item.documentId}`, { headers }));
        return forkJoin(deleteRequests); // Execute all DELETE requests concurrently
      })
    );
  }

}
