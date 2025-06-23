import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, switchMap, forkJoin, map } from 'rxjs';
import { environment } from '../../environments/environment';
import { UserService } from './user.service';
import { IWishlistItem } from '../Interfaces/iwishlist-item';
import { IProduct } from '../Interfaces/iproduct';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
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

  getWishlistItems(email: string): Observable<IWishlistItem[]> {
    const headers = this.getHeaders();
    return this.httpClient.get<{ data: IWishlistItem[] }>(`${this.apiUrl}/wishlist-items?filters[email][$eq]=${email}`, { headers }).pipe(
      map(response => response.data)
    );
  }

  addToWishlist(email: string, prod: IProduct): Observable<any> {
    const wishlistItem = {
      data: {
        email: email,
        product: prod
      }
    };
    const headers = this.getHeaders();
    return this.httpClient.post<IWishlistItem>(`${this.apiUrl}/wishlist-items`, wishlistItem, { headers });
  }

  removeFromWishlist(itemDocId: string): Observable<any> {
    const headers = this.getHeaders();
    return this.httpClient.delete(`${this.apiUrl}/wishlist-items/${itemDocId}`, { headers });
  }

  clearWishlist(email: string): Observable<any> {
    const headers = this.getHeaders();
    // First, fetch all cart items for the user and delete them one by one
    return this.getWishlistItems(email).pipe(
      switchMap((wishlistItems) => {
        // Loop through all cart items and issue DELETE requests
        const deleteRequests = wishlistItems.map(item => this.httpClient.delete(`${this.apiUrl}/wishlist-items/${item.documentId}`, { headers }));
        return forkJoin(deleteRequests); // Execute all DELETE requests concurrently
      })
  );
  }

}
