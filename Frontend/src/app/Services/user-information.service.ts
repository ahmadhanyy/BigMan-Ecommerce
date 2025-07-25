import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, map } from 'rxjs';
import { UserService } from './user.service';
import { WishlistService } from './wishlist.service';
import { IWishlistItem } from '../Interfaces/iwishlist-item';
import { ICartItem } from '../Interfaces/icart-item';
import { CartItemService } from './cart-item.service';

@Injectable({
  providedIn: 'root'
})
export class UserInformationService {
  // Subjects to hold the user's email
  loggedUserEmailSubject = new BehaviorSubject<string | null>(null);  // Initial user id is null
  loggedUserEmail$ = this.loggedUserEmailSubject.asObservable()  // Observable to expose the logged user email

  // Subjects to hold the user's wishlist and cart items when the user is logged in
  wishlistSubject = new BehaviorSubject<IWishlistItem[]>([]);
  userWishlist$ = this.wishlistSubject.asObservable();

  cartSubject = new BehaviorSubject<ICartItem[]>([]);
  userCart$ = this.cartSubject.asObservable();

  // Observable to hold the user's cart count
  cartCount$ = this.cartSubject.asObservable().pipe(
    map(cartItems => cartItems.length)
  );

  constructor(private userService: UserService, private wishlistService: WishlistService, private cartService: CartItemService) {
    const email = this.userService.getEmail();
    if (email) {
      this.loggedUserEmailSubject.next(email);

      this.wishlistService.getWishlistItems(email).subscribe(response => {
        this.wishlistSubject.next(response);
      });

      this.cartService.getCartItems(email).subscribe(response => {
        this.cartSubject.next(response);
      });
    }
    else{
      this.loggedUserEmailSubject.next(null);
      this.wishlistSubject.next([]);
      this.cartSubject.next([]);
    }
  }

}
