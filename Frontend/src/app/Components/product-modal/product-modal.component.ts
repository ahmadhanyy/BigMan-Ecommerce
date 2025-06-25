import { Component, Input, Output, EventEmitter, ElementRef, ViewChild, OnInit } from '@angular/core';
import { IProdVariant, IProduct } from '../../Interfaces/iproduct';
import { ProductService } from '../../Services/product.service';
import { WishlistService } from '../../Services/wishlist.service';
import { ReviewService } from '../../Services/review.service';
import { ICartItem } from '../../Interfaces/icart-item';
import { UserService } from '../../Services/user.service';
import { ModalService } from '../../Services/modal.service';
import { CartItemService } from '../../Services/cart-item.service';
import { environment } from '../../../environments/environment';
import { IWishlistItem } from '../../Interfaces/iwishlist-item';
import { UserInformationService } from '../../Services/user-information.service';
import { IAddress, government } from '../../Interfaces/iaddress';
import { AddressService } from '../../Services/address.service';

@Component({
  selector: 'app-product-modal',
  templateUrl: './product-modal.component.html',
  styleUrl: './product-modal.component.scss'
})
export class ProductModalComponent implements OnInit {
  apiUrl = environment.imageApi;
  @Input() card!: IProduct;
  @Input() isOpen: boolean = false;
  @Output() close = new EventEmitter<void>();
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

  constructor(public prodService: ProductService,
              public reviewService: ReviewService,
              private wishlistService: WishlistService,
              private userService: UserService,
              private modalService: ModalService,
              private cartService: CartItemService,
              private userInfoService: UserInformationService,
              private addressService: AddressService) {
    this.deliveryStartDate = new Date(this.today);
    this.deliveryStartDate.setDate(this.today.getDate() + 3); // 3 days after today

    this.deliveryEndDate = new Date(this.today);
    this.deliveryEndDate.setDate(this.today.getDate() + 5); // 5 days after today
    console.log('product modal component initialized');
  }

  ngOnInit(): void {
    // Subscribe to the loggedUserEmail$ observable to get real-time updates
    this.userService.loggedUserEmail$.subscribe((email) => {
      this.userEmail = email;
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

    // Initialize the chosen img, color and size
    this.chosenImg = this.card.images[0].url;
    if (this.card.prod_variants.length > 0) {
      const firstVariant = this.card.prod_variants[0];
      this.chosenColor = firstVariant.color || '';
      this.chosenSize = firstVariant.size || '';
    }
  }


  closeModal() {
    this.close.emit();
    this.showAllColors = false;
    this.showAllSizes = false;
    this.chosenImg = this.card.images[0].url;
    if (this.card.prod_variants.length > 0) {
      const firstVariant = this.card.prod_variants[0];
      this.chosenColor = firstVariant.color || '';
      this.chosenSize = firstVariant.size || '';
    }
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

  get availableColors(): string[] {
    const colors = this.card?.prod_variants?.map(v => v.color)?.filter((color): color is string => !!color); // remove undefined/null
    return Array.from(new Set(colors));
  }

  get availableSizes(): string[] {
    const sizes = this.card?.prod_variants?.map(v => v.size)?.filter((size): size is string => !!size); // remove undefined/null
    return sizes;
  }

  get currentVariantQuantity(): number {
    // Find the matching variant based on chosen color and size
    if (!this.card.prod_variants[0]?.color && !this.card.prod_variants[0]?.size) {
      // If the product has no colors or sizes, return the quantity of the first variant
      return this.card.prod_variants[0]?.quantity;
    }
    else if (!this.card.prod_variants[0]?.size) {
      // If the product has no sizes, return the quantity of the first variant based on color
      const match = this.card.prod_variants?.find(variant =>
        variant.color === this.chosenColor);
      if (match) {
        return match.quantity;
      }
      return 0;
    }
    else if (!this.card.prod_variants[0]?.color) {
      // IIf the product has no colors, return the quantity of the first variant based on size
      const match = this.card.prod_variants?.find(variant =>
        variant.size === this.chosenSize);
      if (match) {
        return match.quantity;
      }
      return 0;
    }
    // If color and size variants exist, find the matching variant
    const match = this.card.prod_variants?.find(variant =>
      variant.color === this.chosenColor && variant.size === this.chosenSize);
    if (match) {
      return match.quantity;
    }
    return 0;
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
    if (this.countNo < this.currentVariantQuantity) {
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
/*
  addToCart(prod: IProduct) {
    if (!this.userEmail) {
      this.modalService.openLoginModal();
    }
    else {
      // Check if the product is already in the cart
      const existingCartItem = this.cartItems.find(item => item.product.documentId === prod.documentId && item.color === this.chosenColor && item.size === this.chosenSize);
      if (existingCartItem) {
        // If it exists, check if the chosen variant has enough quantity
        let chosenVariant: IProdVariant | undefined;
        if (this.chosenColor === '' && this.chosenSize === ''){
          chosenVariant = prod.prod_variants[0];
          console.log('Chosen variant:', chosenVariant);
        }
        else if (this.chosenColor === '') {
          chosenVariant = prod.prod_variants.find(variant => variant.size === this.chosenSize);
          console.log('Chosen variant:', chosenVariant);
        }
        else if (this.chosenSize === '') {
          chosenVariant = prod.prod_variants.find(variant => variant.color === this.chosenColor);
          console.log('Chosen variant:', chosenVariant);
        }
        else{
          chosenVariant = prod.prod_variants.find(variant => variant.color === this.chosenColor && variant.size === this.chosenSize);
          console.log('Chosen variant:', chosenVariant);
        }
        if (chosenVariant && chosenVariant.quantity < this.countNo) {
          return;
        }
        // If it exists, update the count and cost
        existingCartItem.prodCount += this.countNo;
        existingCartItem.cost += prod.price * this.countNo;
        console.log('Existing cart item:', existingCartItem);
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
        this.closeModal();
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
              cost: res.data.cost,
              isOrdered: res.data.isOrdered
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
        this.closeModal();
      }
    }
  }
*/

addToCart(prod: IProduct) {
  if (!this.userEmail) {
    this.modalService.openLoginModal();
    return;
  }

  // Find the chosen variant
  let chosenVariant: IProdVariant | undefined;
  if (!this.chosenColor && !this.chosenSize){
    chosenVariant = prod.prod_variants[0];
  }
  else if (!this.chosenColor) {
    chosenVariant = prod.prod_variants.find(variant => variant.size === this.chosenSize);
  }
  else if (!this.chosenSize) {
    chosenVariant = prod.prod_variants.find(variant => variant.color === this.chosenColor);
  }
  else{
    chosenVariant = prod.prod_variants.find(variant => variant.color === this.chosenColor && variant.size === this.chosenSize);
  }

  // Check if already in cart
  const existingCartItem = this.cartItems.find(item =>
    item.product.documentId === prod.documentId &&
    item.color === this.chosenColor &&
    item.size === this.chosenSize
  );

  // If no variant found, log an error and exit
  if (!chosenVariant) {
    return;
  }

  // Check if there's enough quantity
  if (this.countNo > (chosenVariant.quantity - (existingCartItem ? existingCartItem.prodCount : 0))) {
    return;
  }

  if (existingCartItem) {
    // Total requested = existing count + new count
    const totalRequested = existingCartItem.prodCount + this.countNo;
    if (totalRequested > chosenVariant.quantity) {
      return;
    }

    // Update the cart item
    existingCartItem.prodCount = totalRequested;
    existingCartItem.cost += prod.price * this.countNo;

    this.cartService.updateItem(existingCartItem).subscribe({
      next: () => {
        this.userInfoService.cartSubject.next(this.cartItems);
        this.countNo = 1;
      },
      error: err => console.error('Failed to update cart item:', err)
    });

    this.closeModal();
  } else {
    // Add new item to cart
    const cost = prod.price * this.countNo;
    this.cartService.addToCart(this.userEmail, prod, this.countNo, this.chosenColor, this.chosenSize, this.deliveryDate, cost).subscribe({
      next: res => {
        const newItem: ICartItem = {
          id: res.data.id,
          documentId: res.data.documentId,
          email: res.data.email,
          product: res.data.product,
          prodCount: res.data.prodCount,
          color: res.data.color,
          size: res.data.size,
          deliveryDate: res.data.deliveryDate,
          deliveryStatus: res.data.deliveryStatus,
          cost: res.data.cost,
          isOrdered: res.data.isOrdered
        };
        this.cartItems.push(newItem);
        this.userInfoService.cartSubject.next(this.cartItems);
        this.countNo = 1;
      },
      error: err => {
        this.countNo = 1;
        console.error('Failed to add to cart:', err);
      }
    });

    this.closeModal();
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

  // Computed properties to determine visible items
  get visibleColors() {
    return this.showAllColors ? this.availableColors  : this.availableColors.slice(0, 10); // Show 10 colors
  }

  get visibleSizes() {
    return this.showAllSizes ? this.availableSizes : this.availableSizes.slice(0, 10);
  }

  // Methods to show more colors and sizes
  showMoreColors() {
    this.showAllColors = true;
  }

  showMoreSizes() {
    this.showAllSizes = true;
  }

  onBackdropClick(event: MouseEvent) {
    if ((event.target as HTMLElement).classList.contains('modal')) {
      this.closeModal(); // Close modal if the user clicks on the backdrop
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
