import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { IProduct } from '../../Interfaces/iproduct';
import { ProductService } from '../../Services/product.service';
import { WishlistService } from '../../Services/wishlist.service';
import { ActivatedRoute, Data } from '@angular/router';
import { CartItemService } from '../../Services/cart-item.service';
import { UserService } from '../../Services/user.service';
import { ModalService } from '../../Services/modal.service';
import { environment } from '../../../environments/environment';
import { IWishlistItem } from '../../Interfaces/iwishlist-item';
import { UserInformationService } from '../../Services/user-information.service';
import { ICartItem } from '../../Interfaces/icart-item';
import { IAddress, government } from '../../Interfaces/iaddress';
import { AddressService } from '../../Services/address.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit {
  apiUrl = environment.imageApi;
  card!: IProduct;
  @ViewChild('imgsWrapper') imgsWrapper!: ElementRef<HTMLDivElement>;
  countNo: number = 1;
  today: Date = new Date();
  deliveryStartDate: Date;
  deliveryEndDate: Date;
  chosenColor: string = '';
  chosenSize: string = '';
  chosenImg: string = '';
  showAllColors = false;
  showAllSizes = false;
  userEmail : string | null = null;
  wishlistItems: IWishlistItem[] = [];
  cartItems: ICartItem[] = [];
  deliveryDate: Date = new Date();
  userAddress: IAddress | null = null;

  constructor(private prodService: ProductService,
              private wishlistService: WishlistService,
              private route: ActivatedRoute,
              private cartService: CartItemService,
              private userService: UserService,
              private modalService: ModalService,
              private userInfoService: UserInformationService,
              private addressService: AddressService) {
    this.deliveryStartDate = new Date(this.today);
    this.deliveryStartDate.setDate(this.today.getDate() + 3); // 3 days after today

    this.deliveryEndDate = new Date(this.today);
    this.deliveryEndDate.setDate(this.today.getDate() + 5); // 5 days after today
  }

  ngOnInit(): void {
    // Subscribe to route parameters to determine if an id is passed
    this.route.paramMap.subscribe((params) => {
      // Extract product ID, if present, otherwise it will be NaN
      const prodId = Number(params.get('id'));
      this.prodService.getProductById(prodId!).subscribe((response: any) => {
        this.card = response.data[0];
      // Initialize the chosen img, color and size
      this.chosenImg = this.card.images[0].url;
      if (this.card.prod_colors && this.card.prod_colors.length > 0) {
        this.chosenColor = this.card.prod_colors[0].color;
      }
      if (this.card.prod_sizes && this.card.prod_sizes.length > 0) {
        this.chosenSize = this.card.prod_sizes[0].size;
      }
      });
    });

    // Subscribe to the loggedUserId$ observable to get real-time updates
    this.userService.loggedUserEmail$.subscribe((email) => {
      this.userEmail = email;
      // Get wishlist and cart items for the logged-in user
      if (this.userEmail) {
        this.userInfoService.userWishlist$.subscribe((items) => {
          this.wishlistItems = items;
        });
        this.userInfoService.userCart$.subscribe((items) => {
          this.cartItems = items;
        });
        this.addressService.getAddressByEmail(this.userEmail).subscribe({
          next: (address) => {
            this.userAddress = address[0];
            console.log('User address:', this.userAddress);
          },
          error: (err) => {
            console.error('Failed to fetch user address:', err);
          }
        });
      }
    });
  }

  scroll(direction: string) {
    if (this.card.images && this.card.images.length > 5) {
      if (direction == 'left') {
        this.imgsWrapper.nativeElement.scrollBy({
          left: -((this.card.images.length * 60) - 300),
          behavior: 'smooth'
        });
      }
      else {
        this.imgsWrapper.nativeElement.scrollBy({
          left: ((this.card.images.length * 60) - 300),
          behavior: 'smooth'
        });
      }
    }
  }

  chooseColor(color: string) {
    this.chosenColor = color;
  }

  chooseSize(size: string) {
    this.chosenSize = size;
  }

  chooseImg(img: string) {
    this.chosenImg = img;
  }

  decrementQuantity() {
    if (this.countNo > 1) {
      this.countNo--;
    }
  }

  incrementQuantity() {
    if (this.card.quantity > this.countNo) {
      this.countNo++;
    }
  }

  calcDeliveryDate() {
    if (this.userAddress?.government == government.Cairo || this.userAddress?.government == government.Giza) {
      this.deliveryDate.setDate(this.today.getDate() + 3); // 3 days after today
    }
    else{
      this.deliveryDate.setDate(this.today.getDate() + 5); // 5 days after today
    }
  }

  addToCart(prod: IProduct) {
    if (!this.userEmail) {
      this.modalService.openLoginModal();
    }
    else {
      // Check if the product is already in the cart
      const existingCartItem = this.cartItems.find(item => item.product.documentId === prod.documentId && item.color === this.chosenColor && item.size === this.chosenSize);
      if (existingCartItem) {
        // If it exists, update the count and cost
        existingCartItem.prodCount += this.countNo;
        existingCartItem.cost += prod.price * this.countNo;
        console.log('Existing cart item document Id found:', existingCartItem.documentId);
        this.cartService.updateItem(existingCartItem).subscribe({
          next: (res) => {
            // Update the cart items in the component
            this.userInfoService.cartSubject.next(this.cartItems);
            this.countNo = 1; // Reset count after adding to cart
          },
          error: (err) => {
            console.error('Failed to update cart item:', err);
          }
        });
      } else {
        // If it doesn't exist, create a new cart item
        const cost = prod.price * this.countNo;
        this.cartService.addToCart(this.userEmail, prod, this.countNo, this.chosenColor, this.chosenSize, this.deliveryDate, cost).subscribe({
          next: (res) => {
            // Update the cart items in the component
            let newItem: ICartItem = {
              id: res.data.id,
              documentId: res.data.documentId,
              email: res.data.email,
              product: res.data.product,
              prodCount: res.data.prodCount,
              color: res.data.color,
              size: res.data.size,
              deliveryDate: res.data.deliveryDate,
              deliveryStatus: res.data.deliveryStatus,
              cost: res.data.cost
            }
            this.cartItems.push(newItem);
            this.userInfoService.cartSubject.next(this.cartItems);
            this.countNo = 1;
          },
          error: (err) => {
            this.countNo = 1;
            console.error('Failed to add to wishlist:', err);
          }
        });
      }
    }
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

  // Computed properties to determine visible items
  get visibleColors() {
    if (this.card.prod_colors) {
      return this.showAllColors ? this.card.prod_colors : this.card.prod_colors.slice(0, 10); // Show 10 colors
    }
    else {
      return [];
    }
  }

  get visibleSizes() {
    if (this.card.prod_sizes) {
      return this.showAllSizes ? this.card.prod_sizes : this.card.prod_sizes.slice(0, 10); // Show 10 colors
    }
    else {
      return [];
    }
  }

  // Methods to show more colors and sizes
  showMoreColors() {
    this.showAllColors = true;
  }

  showMoreSizes() {
    this.showAllSizes = true;
  }

}
