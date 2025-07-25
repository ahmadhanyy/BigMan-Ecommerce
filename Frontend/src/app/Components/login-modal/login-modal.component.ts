import { Component, Input, Output, EventEmitter } from '@angular/core';
import { UserService } from '../../Services/user.service';
import { ModalService } from '../../Services/modal.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrl: './login-modal.component.scss'
})
export class LoginModalComponent {
  @Input() isOpen: boolean = false;
  @Output() close = new EventEmitter<void>();
  errorMessage: string = '';
  passwordVisible: boolean = false;

  constructor(private userService: UserService,
              private modalService: ModalService,
              private route: Router) {}

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

  onLogin(email: string, password: string){
    this.userService.login(email, password).subscribe(
      (response) => {
        if (response.user.isAdmin === true){
          this.route.navigateByUrl('adminOrders');
        }
        this.errorMessage = '';
        this.passwordVisible = false; // Reset password visibility when closing the modal
        this.modalService.loginModalSubject.next(false); // Close the modal after successful login
      },
      (error) => {
        this.errorMessage = 'Invalid Email or Password.'; // Display error message
        this.passwordVisible = false; // Reset password visibility when closing the modal
        console.log(error);
      }
    );
  }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

}
