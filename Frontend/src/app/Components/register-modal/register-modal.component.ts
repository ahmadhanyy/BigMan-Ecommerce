import { Component, Input, Output, EventEmitter } from '@angular/core';
import { UserService } from '../../Services/user.service';
import { ModalService } from '../../Services/modal.service';

@Component({
  selector: 'app-register-modal',
  templateUrl: './register-modal.component.html',
  styleUrl: './register-modal.component.scss'
})
export class RegisterModalComponent {
  @Input() isOpen: boolean = false;
  @Output() close = new EventEmitter<void>();
  passwordVisible: boolean = false;
  errorMessage: string = '';

  constructor(private userService: UserService,
              private modalService: ModalService
  ) {
    console.log('RegisterModalComponent initialized');
  }


  closeModal() {
    this.close.emit();
    this.errorMessage = '';
    this.passwordVisible = false; // Reset password visibility when closing the modal
  }

  onBackdropClick(event: MouseEvent) {
    if ((event.target as HTMLElement).classList.contains('modal')) {
      this.closeModal(); // Close modal if the user clicks on the backdrop
    }
  }

  onRegister(username: string, email: string, password: string){
    this.userService.register(username, email, password).subscribe(
      (response) => {
        this.errorMessage = '';
        this.passwordVisible = false; // Reset password visibility when closing the modal
        this.modalService.registerModalSubject.next(false); // Close the modal after successful login
        console.log(response);
      },
      (error) => {
        this.passwordVisible = false; // Reset password visibility when closing the modal
        this.errorMessage = 'This Email is already in use.'; // Display error message
        console.error(error);
      }
    );
  }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

}
