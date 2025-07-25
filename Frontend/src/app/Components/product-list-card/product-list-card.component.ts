import { Component, Input, OnInit, Renderer2 } from '@angular/core';
import { IProduct } from '../../Interfaces/iproduct';
import { WishlistService } from '../../Services/wishlist.service';
import { ModalService } from '../../Services/modal.service';
import { ReviewService } from '../../Services/review.service';
import { UserService } from '../../Services/user.service';
import { environment } from '../../../environments/environment';
import { IWishlistItem } from '../../Interfaces/iwishlist-item';
import { UserInformationService } from '../../Services/user-information.service';

@Component({
  selector: 'app-product-list-card',
  templateUrl: './product-list-card.component.html',
  styleUrl: './product-list-card.component.scss'
})
export class ProductListCardComponent implements OnInit {
  apiUrl = environment.imageApi;
  @Input() card!: IProduct;
  isModalProdOpen = false;
  isModalLoginOpen = false;
  userEmail : string | null = null;
  wishlistItems: IWishlistItem[] = [];

  constructor(
    public reviewService: ReviewService,
    private renderer: Renderer2,
    private modalService: ModalService,
    private wishlistService: WishlistService,
    private userService: UserService,
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
  }

  openModal() {
    if(this.userService.isLoggedIn()) {
      this.isModalProdOpen = true;
      this.renderer.addClass(document.body, 'modal-open');
    }
    else {
      this.modalService.openLoginModal();
      this.renderer.addClass(document.body, 'modal-open');
    }
  }

  closeProdModal() {
    this.isModalProdOpen = false;
    this.renderer.removeClass(document.body, 'modal-open');
  }

  closeLoginModal() {
    this.modalService.closeLoginModal();
    this.renderer.removeClass(document.body, 'modal-open'); // Remove the modal-open class to <body>
  }

  addToWishlist(card: IProduct) {
    if (!this.userEmail) {
      this.modalService.openLoginModal();
    } else {
      this.wishlistService.addToWishlist(this.userEmail, card).subscribe({
        next: (res) => {
          // Update the wishlist items in the component
          let newItem: IWishlistItem = {
            id: res.data.id,
          documentId: res.data.documentId,
          email: res.data.email,
            product: res.data.product,
          }
          this.wishlistItems.push(newItem);
          this.userInfoService.wishlistSubject.next(this.wishlistItems);
        },
        error: (err) => {
          console.error('Failed to add to wishlist:', err);
        }
      });
    }
  }

  removeFromWishlist(card: IProduct) {
    if (!this.userEmail) {
      this.modalService.openLoginModal();
    } else {
      // Find the wishlist item to remove
      const wishlistItem = this.wishlistItems.find(item => item.product.documentId === card.documentId);
      if (!wishlistItem) {
        console.warn('Product not found in wishlist');
        return;
      }
      this.wishlistService.removeFromWishlist(wishlistItem.documentId).subscribe({
        next: (res) => {
          // Update the wishlist items in the component
          this.wishlistItems = this.wishlistItems.filter(item => {
            return item.documentId !== wishlistItem.documentId;
          });;
          this.userInfoService.wishlistSubject.next(this.wishlistItems);
        },
        error: (err) => {
          console.error('Failed to add to wishlist:', err);
        }
      });
    }
  }

  isInWishlist(prod: IProduct) : boolean {
    if (!this.userEmail) {
      return false;
    }
    let targetItem = this.wishlistItems.find(
      (item) => item.product.documentId === prod.documentId
    );
    if (targetItem) {
      return true;
    }
    return false;
  }

}
