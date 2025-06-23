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
  @ViewChild('voucherInput') voucherCode!: ElementRef<HTMLInputElement>;
  paymentMethod: string = '';
  cardNumber: string = '';
  cardHolder: string = '';
  cardExpiryDate: Date = new Date();
  cvv: number = 0;
  isPayMethodSelected: boolean = true;

  constructor(private userService: UserService,
              private userInfoService: UserInformationService,
              private modalService: ModalService,
              private addressService: AddressService,
              private orderService: OrderService,
              private cartService: CartItemService,
              private voucherService: VoucherService,
              private renderer: Renderer2,
              private router: Router)
              {}

  ngOnInit(): void {
    // Subscribe to the loggedUserId$ observable to get real-time updates
    this.userService.loggedUserEmail$.subscribe((email) => {
      this.loggedEmail = email;
      if (!this.loggedEmail) {
        this.modalService.openLoginModal();
      }
      else{
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

  getShippigPrice(): number {
    let shippingPrice: number = 0;
    for (let i = 0; i < this.cartItems.length; i++) {
      if (!this.cartItems[i].product.freeShipping) {
        shippingPrice += this.cartItems[i].product.shippingPrice * this.cartItems[i].prodCount;
      }
    }
    return shippingPrice;
  }

  getTotalPrice(): number {
    let totalPrice: number = this.getSubTotalPrice() + this.getShippigPrice();
    if (this.validVoucher) {
      totalPrice -= this.validVoucher.value;
    }
    return totalPrice;
  }

  applyVoucher(): void {
    const code = this.voucherCode.nativeElement.value.trim();
    if (!code){
      return;
    }
    console.log('Applying voucher code:', code);
    console.log('Available vouchers:', this.userVouchers);
    this.validVoucher = this.userVouchers.find((voucher) => voucher.code === code);
    console.log('Valid voucher:', this.validVoucher);
    if (!this.validVoucher){
      this.isVoucheFound = false;
    }
    else {
      this.isVoucheFound = true;
    }
  }

  removeVoucher() {
    this.validVoucher = undefined;
    this.voucherCode.nativeElement.value = '';
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
          console.log('Order placed successfully: ', res)
          this.cartService.clearCart(this.loggedEmail!).subscribe({
            next: (res) => {
            },
            error: (err) => {
              console.log('Failed to delete cart items: ', err)
            }
          }); // Clear the cart in the cart service
          this.userInfoService.cartSubject.next([]); // Clear the cart in the user information service
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
