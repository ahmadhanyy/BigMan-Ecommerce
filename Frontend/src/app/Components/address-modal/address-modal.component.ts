import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { AddressService } from '../../Services/address.service';
import { UserService } from '../../Services/user.service';
import { IAddress, government } from '../../Interfaces/iaddress';
import { UserInformationService } from '../../Services/user-information.service';

@Component({
  selector: 'app-address-modal',
  templateUrl: './address-modal.component.html',
  styleUrl: './address-modal.component.scss'
})
export class AddressModalComponent implements OnInit{
  @Input() isOpen: boolean = false;
  @Output() close = new EventEmitter<void>();
  @Output() updatedAddress = new EventEmitter<IAddress>();
  userAddress: IAddress;
  governments: string[] = Object.values(government);


  constructor(private addressService: AddressService,
              private userService: UserService,
              private userInfoService: UserInformationService,
  ) {
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
    this.userInfoService.loggedUserEmail$.subscribe(email => {
      if (email) {
        this.userAddress.email = email;
        this.addressService.getAddressByEmail(email).subscribe({
          next: (res) => {
            if(res){
              this.userAddress = res[0];
            }
          },
          error: (err) => {
            console.error('Failed to fetch the address:', err);
          }
        });
      }
    });
  }

  closeModal() {
    this.close.emit();
  }

  onBackdropClick(event: MouseEvent) {
    if ((event.target as HTMLElement).classList.contains('modal')) {
      this.closeModal(); // Close modal if the user clicks on the backdrop
    }
  }

  changeAddress(){
    if (this.userAddress.documentId != '') {
      this.addressService.updateAddress(this.userAddress.documentId, this.userAddress).subscribe({
        next: (res) => {
          this.updatedAddress.emit(this.userAddress); // emit updated address
          this.closeModal();
        },
        error: (err) => {
          console.error('Failed to update address:', err);
        }
      });
    }
    else if (this.userAddress.documentId === '') {
      this.addressService.addAddress(this.userAddress).subscribe({
        next: (res) => {
          this.updatedAddress.emit(this.userAddress); // emit updated address
          this.closeModal();
        },
        error: (err) => {
          console.error('Failed to add address:', err);
        }
      });
    }
  }
}
