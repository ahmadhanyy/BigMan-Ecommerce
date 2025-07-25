import { Component, OnInit, OnChanges } from '@angular/core';
import { WishlistService } from '../../Services/wishlist.service';
import { IProduct } from '../../Interfaces/iproduct';
import { ProductService } from '../../Services/product.service';
import { UserService } from '../../Services/user.service';
import { ModalService } from '../../Services/modal.service';
import { IWishlistItem } from '../../Interfaces/iwishlist-item';
import { UserInformationService } from '../../Services/user-information.service';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrl: './wish-list.component.scss'
})
export class WishListComponent implements OnInit {
  wishlistItems: IWishlistItem[] = [];
  prodsList: IProduct[] = [];
  textOnList: string = 'Big Sale New Collection';
  userEmail: string | null = null;
  isLoading: boolean = true;

  constructor(private wishlistService: WishlistService,
              private prodService: ProductService,
              private userService: UserService,
              private modalService: ModalService,
              private userInfoService: UserInformationService) {}

  ngOnInit(): void {
    // Subscribe to the loggedUserId$ observable to get real-time updates
    this.userInfoService.loggedUserEmail$.subscribe((email) => {
      this.userEmail = email;
      if (this.userEmail) {
        this.userInfoService.userWishlist$.subscribe((items) => {
          this.wishlistItems = items;
        });
      }
    });

    this.prodService.getDiscountByCategory('Clothes').subscribe((response: any) => {
      this.isLoading = false;
      this.prodsList = response.data;
    });
  }

  clearWishlist(): void {
    if (!this.userEmail) {
      this.modalService.openLoginModal();
    }
    else{
      this.wishlistService.clearWishlist(this.userEmail).subscribe({
        next: (res) => {
          // Update the cart items in the component
          this.userInfoService.wishlistSubject.next([]);
        },
        error: (err) => {
          console.error('Failed to clear wishlist:', err);
        }
      });
      this.wishlistItems = [];
    }
  }

}
