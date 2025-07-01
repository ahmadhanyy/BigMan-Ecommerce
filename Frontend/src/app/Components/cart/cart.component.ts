import { Component, OnInit } from '@angular/core';
import { IProduct } from '../../Interfaces/iproduct';
import { ProductService } from '../../Services/product.service';
import { ICartItem } from '../../Interfaces/icart-item';
import { CartItemService } from '../../Services/cart-item.service';
import { UserService } from '../../Services/user.service';
import { UserInformationService } from '../../Services/user-information.service';
import { ModalService } from '../../Services/modal.service';
import { environment } from '../../../environments/environment';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  apiUrl = environment.imageApi;
  loggedUserEmail: string | null;
  cartItems: ICartItem[] = [];
  productsList: IProduct[] = [];
  textOnList: string = 'Big Sale Now! Up To 50% off on all clothes.';

  constructor(private prodService: ProductService,
              private cartItemService: CartItemService,
              private userService: UserService,
              private userInfoService: UserInformationService,
              private modalService: ModalService,
              private viewportScroller: ViewportScroller)
              {
                this.loggedUserEmail = null;
              }

  ngOnInit(): void {
    // Subscribe to the loggedUserId$ observable to get real-time updates
    this.userService.loggedUserEmail$.subscribe((email) => {
      this.loggedUserEmail = email;
      if (this.loggedUserEmail) {
        this.userInfoService.userCart$.subscribe((items) => {
          this.cartItems =  items;
        });
      }
    });
    this.prodService.getDiscountByCategory('Clothes').subscribe((response: any) => {
      this.productsList = response.data;
    });
  }

  getSubTotalPrice(): number {
    let subTotalPrice: number = 0;
    for (let i = 0; i < this.cartItems.length; i++) {
      let discountPrecent = this.cartItems[i].product.discountPrecent;
      let itemPrice: number;
      if (discountPrecent) {
        itemPrice = this.cartItems[i].product.price - ((this.cartItems[i].product.price * discountPrecent) / 100);
      } else {
        itemPrice = this.cartItems[i].product.price;
      }
      subTotalPrice += itemPrice * this.cartItems[i].prodCount;
    }
    return subTotalPrice;
  }

  getShippigPrice(): number {
    let shippingPrice: number = 0;
    for (let i = 0; i < this.cartItems.length; i++) {
      if (!this.cartItems[i].product.freeShipping) {
        shippingPrice += this.cartItems[i].product.shippingPrice * this.cartItems[i].prodCount;
      }
    }
    return shippingPrice;
  }

  clearCart(): void {
    if (this.loggedUserEmail) {
      this.cartItemService.clearCart(this.loggedUserEmail).subscribe({
        next: (res) => {
          // Update the cart items in the component
          this.userInfoService.cartSubject.next([]);
        },
        error: (err) => {
          console.error('Failed to clear cart:', err);
        }
      });
      this.cartItems = [];
    }
  }

  removeItem(targetItem: ICartItem): void {
    this.cartItemService.removeFromCart(targetItem.documentId).subscribe({
      next: (res) => {
        // Update the cart items in the component
        this.cartItems = this.cartItems.filter(item => {
          return item.documentId !== targetItem.documentId;
        });;
        this.userInfoService.cartSubject.next(this.cartItems);
      },
      error: (err) => {
        console.error('Failed to add to wishlist:', err);
      }
    });
  }

  incrementItem(item: ICartItem): void {
    if (this.loggedUserEmail) {
      const matchedVariant = item.product.prod_variants.find(variant => variant.color === item.color && variant.size === item.size);
      if (matchedVariant && item.prodCount < matchedVariant.quantity) {
        item.prodCount++;
        this.cartItemService.updateItem(item).subscribe({
          next: (res) => {
            // Update the cart items in the component
            this.userInfoService.cartSubject.next(this.cartItems);
          },
          error: (err) => {
            console.error('Failed to increment item:', err);
          }
        });
      }
    }
  }

  decrementItem(item: ICartItem): void {
    if (this.loggedUserEmail) {
      if (item.prodCount > 1) {
        item.prodCount--;
        this.cartItemService.updateItem(item).subscribe({
          next: (res) => {
            // Update the cart items in the component
            this.userInfoService.cartSubject.next(this.cartItems);
          },
          error: (err) => {
            console.error('Failed to decrement item:', err);
          }
        });
      }
    }
  }

  checkout(){
    this.viewportScroller.scrollToPosition([0, 0]); // scroll to top
  }

}
