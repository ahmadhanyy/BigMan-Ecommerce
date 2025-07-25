import { Component, OnInit, Renderer2 } from '@angular/core';
import { IUser } from '../../Interfaces/iuser';
import { UserService } from '../../Services/user.service';
import { AddressService } from '../../Services/address.service';
import { IAddress, government } from '../../Interfaces/iaddress';
import { UserInformationService } from '../../Services/user-information.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss'
})
export class AccountComponent implements OnInit {
  user: IUser | null = null;
  userAddress: IAddress | null = null;
  newPassword: string = '';
  rePassword: string = '';
  passwordVisible: boolean = false;
  rePasswordVisible: boolean = false;
  governments: string[] = Object.values(government);
  isVerifyModalOpen: boolean = false;
  formToUpdate: 'account' | 'address' | null = null;
  errorMessage: string = '';

  constructor(private userService: UserService,
              private userInfoService: UserInformationService,
              private addressService: AddressService,
              private renderer: Renderer2,
              private route: Router
              ) {
    // Initialize user and address with default values
    this.user = {
      id: 0,
      documentId: '',
      username: '',
      email: '',
      password: '',
      isAdmin: false
    };
    this.userAddress = {
      id: 0,
      documentId: '',
      buildingNo: 0,
      street: '',
      city: '',
      government: government.Cairo,
      phone: '',
      email: ''
    };
  }

  ngOnInit(): void {
    this.userInfoService.loggedUserEmail$.subscribe(
      (email) => {
        if (email) {
          // Fetch the user data using the email
          this.userService.getUserByEmail(email).subscribe(
            (res) => {
              if (res.length > 0) {
                this.user = res[0];
              }
              console.log('user: ', this.user);
            },
            (error) => {
              console.error('Error fetching user data:', error);
            }
          );
          // Fetch the address for the user
          this.addressService.getAddressByEmail(email).subscribe(
            (address) => {
              if (address.length > 0) {
                this.userAddress = address[0];
              }
              console.log('addrss: ', this.userAddress);
            },
            (error) => {
              console.error('Error fetching address:', error);
            }
          );
        }
      },
      (error) => {
        console.error('Error fetching logged user email:', error);
      }
    )
  }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

  toggleRePasswordVisibility() {
    this.rePasswordVisible = !this.rePasswordVisible;
  }

  openVerifyModal(formType: 'account' | 'address') {
    this.formToUpdate = formType;
    this.isVerifyModalOpen = true;
    this.renderer.addClass(document.body, 'modal-open');
  }


  closeVerifyModal(){
    this.isVerifyModalOpen = false;
    this.renderer.removeClass(document.body, 'modal-open');
  }

  updateAccount() {
    if (this.user && this.user.documentId) {
      if (this.newPassword && this.newPassword === this.rePassword) {
        // If new password is provided and matches rePassword, update it
        this.user.password = this.newPassword;
      }
      // Update the user information
      this.userService.updateUser(this.user!.id, this.user!).subscribe(
        (updatedUser) => {
          this.user = { ...updatedUser }; // Ensure a new reference
          this.newPassword = '';
          this.rePassword = '';
          this.userService.logout(); // Log out the user after updating account details
          this.route.navigateByUrl('home'); // Redirect to home after logout

        },
        (error) => {
          console.error('Error updating user:', error);
        }
      );
    }
  }

  updateAddress(){
    this.addressService.updateAddress(this.userAddress!.documentId, this.userAddress!).subscribe(
      (address) => {
        this.userAddress = { ...address }; // Ensure a new reference
      },
      (error) => {
        console.error('Error updating address:', error);
      }
    );
  }

  onVerification(isVerified: boolean) {
    if (isVerified) {
      this.closeVerifyModal();
      if (this.formToUpdate === 'account') {
        this.updateAccount();
      } else if (this.formToUpdate === 'address') {
        this.updateAddress();
      }
    } else {
      console.error('User verification failed');
    }
  }

}

