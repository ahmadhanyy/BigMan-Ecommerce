import { Component, ViewChild, ElementRef, OnInit, Renderer2, } from '@angular/core';
import { UserService } from '../../Services/user.service';
import { ModalService } from '../../Services/modal.service';
import { environment } from '../../../environments/environment';
import { UserInformationService } from '../../Services/user-information.service';
import { DeliveryStatus, ICartItem } from '../../Interfaces/icart-item';
import { IAddress, government } from '../../Interfaces/iaddress';
import { AddressService } from '../../Services/address.service';
import { OrderService } from '../../Services/order.service';
import { CartItemService } from '../../Services/cart-item.service';
import { IVoucher } from '../../Interfaces/ivoucher';
import { VoucherService } from '../../Services/voucher.service';
import { Router  } from '@angular/router';
import { ProductService } from '../../Services/product.service';
import { IProdVariant } from '../../Interfaces/iproduct';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss'
})
export class PaymentComponent implements OnInit {
  apiUrl = environment.imageApi;
  loggedEmail: string | null = null;
  cartItems: ICartItem[] = [];
  userAddress: IAddress | null = null;
  isAddressModalOpen: boolean = false;
  deliveryDate: Date = new Date();
  userVouchers: IVoucher[] = [];
  validVoucher: IVoucher | undefined = undefined;
  isVoucheFound: boolean = true;
  voucherText: string = '';
  paymentMethod: string = '';
  cardNumber: string = '';
  cardHolder: string = '';
  cardExpiryDate: Date = new Date();
  cvv: number = 0;
  isPayMethodSelected: boolean = true;
  isOrderModalOpen: boolean = false;

  constructor(private userService: UserService,
              private userInfoService: UserInformationService,
              private modalService: ModalService,
              private addressService: AddressService,
              private orderService: OrderService,
              private cartService: CartItemService,
              private prodService: ProductService,
              private voucherService: VoucherService,
              private renderer: Renderer2,
              private router: Router)
              {}

  ngOnInit(): void {
    // Subscribe to the loggedUserId$ observable to get real-time updates
    this.userService.loggedUserEmail$.subscribe((email) => {
      this.loggedEmail = email;
      if (this.loggedEmail) {
        this.userInfoService.userCart$.subscribe((items) => {
          this.cartItems =  items;
        });
        // Fetch address for the logged-in user
        this.addressService.getAddressByEmail(this.loggedEmail).subscribe({
          next: (response) => {
            this.userAddress = response[0];
            if(this.userAddress.government == government.Cairo){
              this.deliveryDate = new Date(); // Reset delivery date to today
              this.deliveryDate.setDate(this.deliveryDate.getDate() + 3); // Delivey after 3 days for Cairo
            }
            else{
              this.deliveryDate = new Date(); // Reset delivery date to today
              this.deliveryDate.setDate(this.deliveryDate.getDate() + 5); // Delivey after 5 days for other governorates
            }
          },
          error: (error) => {
            console.error('Error fetching address:', error);
          }
        });
        // Fetch vouchers for the logged-in user
        this.voucherService.getAvailableVouchers(this.loggedEmail).subscribe({
          next: (vouchers) => {
            this.userVouchers = vouchers;
          },
          error: (error) => {
            console.error('Error fetching vouchers:', error);
          }
        });
      }
    });
  }

  openOrderModal() {
    this.isOrderModalOpen = true;
    this.renderer.addClass(document.body, 'modal-open');
  }

  closeOrderModal(){
    this.isOrderModalOpen = false;
    this.renderer.removeClass(document.body, 'modal-open');
  }

  openAddressModal() {
    this.isAddressModalOpen = true;
    this.renderer.addClass(document.body, 'modal-open');
  }

  closeAddressModal(){
    this.isAddressModalOpen = false;
    this.renderer.removeClass(document.body, 'modal-open');
  }

  onAddressUpdated(newAddress: IAddress) {
    this.userAddress = newAddress;
    // Update delivery date again based on government
    if (newAddress.government === government.Cairo) {
      this.deliveryDate = new Date();
      this.deliveryDate.setDate(this.deliveryDate.getDate() + 3);
    } else {
      this.deliveryDate = new Date();
      this.deliveryDate.setDate(this.deliveryDate.getDate() + 5);
    }
  }

  choosePayMethod(){
    this.isPayMethodSelected = true;
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

  getShippingPrice(): number {
    let shippingPrice: number = 0;
    for (let i = 0; i < this.cartItems.length; i++) {
      if (!this.cartItems[i].product.freeShipping) {
        shippingPrice += this.cartItems[i].product.shippingPrice * this.cartItems[i].prodCount;
      }
    }
    return shippingPrice;
  }

  getTotalPrice(): number {
    let totalPrice: number = this.getSubTotalPrice() + this.getShippingPrice();
    if (this.validVoucher) {
      totalPrice -= this.validVoucher.value;
    }
    return totalPrice;
  }

  applyVoucher(): void {
    const code = this.voucherText.trim();
    if (!code){
      return;
    }
    this.validVoucher = this.userVouchers.find((voucher) => voucher.voucherCode === code && !voucher.isUsed && !voucher.isExpired);
    if (this.validVoucher){
      this.isVoucheFound = true;
    }
    else {
      this.isVoucheFound = false;
    }
    console.log('Voucher :', this.validVoucher);
  }

  removeVoucher() {
    this.validVoucher = undefined;
    this.voucherText = '';
    this.isVoucheFound = true;
  }


  confirmOrder() {
    if (this.paymentMethod && this.userAddress && this.loggedEmail && this.isVoucheFound) {
      if(this.paymentMethod === 'card' && (!this.cardNumber || !this.cardHolder || !this.cardExpiryDate || !this.cvv)){
        return;
      }
      this.isPayMethodSelected = true;
      const orderStatus = DeliveryStatus.pending;
      const orderData = new Date();
      const deliveryDate = this.deliveryDate;
      const cost = this.getTotalPrice();
      // Create the order with the selected payment method
      this.orderService.addOrder(this.loggedEmail, this.cartItems, this.userAddress, orderData, deliveryDate, orderStatus, cost, this.paymentMethod, this.cardNumber, this.cardHolder, this.cardExpiryDate, this.cvv).subscribe({
        next: (res) => {
          // Check if a voucher was used and update it
          if (this.validVoucher) {
            this.validVoucher.isUsed = true;
            this.validVoucher.usageDate = new Date();
            this.voucherService.updateVoucher(this.validVoucher).subscribe({
              next: (res) => {
              },
              error: (error) => {
                console.error('Error using voucher:', error);
              }
            });
          }
          // Update the cart items as ordered in the cart service
          let updatedCount = 0;
          for (let item of this.cartItems) {
            // Set the item as ordered
            item.isOrdered = true;
            // Update the cart item in the service
            this.cartService.updateItem(item).subscribe({
              next: (res) => {
                updatedCount++;
                if (updatedCount === this.cartItems.length) {
                  // All items updated, clear the cart and navigate to home
                  this.userInfoService.cartSubject.next([]);
                  this.openOrderModal();
                }
              },
              error: (error) => {
                console.error('Error updating cart item to ordered:', error);
              }
            });
            // Decrement the product count after placing the order
            // Find the matching variant
            let matchingVariant: IProdVariant | undefined = undefined;
            if (!item.product.prod_variants[0]?.color && !item.product.prod_variants[0]?.size){
              matchingVariant = item.product.prod_variants[0]; // If no color or size, use the first variant
            }
            else if (!item.product.prod_variants[0]?.color){
              matchingVariant = item.product.prod_variants?.find(variant => variant.size === item.size);
            }
            else if (!item.product.prod_variants[0]?.size){
              matchingVariant = item.product.prod_variants?.find(variant => variant.color === item.color);
            }
            else{
              matchingVariant = item.product.prod_variants?.find(
                variant => variant.color === item.color && variant.size === item.size
              );
            }
            if (matchingVariant) {
              matchingVariant.quantity -= item.prodCount;
              this.prodService.updateVariantQuantity(matchingVariant.documentId, matchingVariant).subscribe({
                next: () => {
                  console.log(`Variant quantity updated for product ${item.product.name}, color ${item.color}, size ${item.size}`);
                },
                error: (err) => {
                  console.error('Error updating variant quantity:', err);
                }
              });
            }
          }
        },
        error: (err) => {
          console.error('Order failed', err);
        }
      });
    }
    else{
      if (!this.paymentMethod){
        this.isPayMethodSelected = false;
        console.log('there is no payment method')
      }
      else if (!this.isVoucheFound){
        console.log('there is no voucher')
      }
      else if (!this.userAddress){
        console.log('there is no address')
      }
      console.log('unknown error!!')
    }
  }

}
