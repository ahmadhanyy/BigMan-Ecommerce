import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { UserService } from '../../Services/user.service';
import { ViewportScroller } from '@angular/common';
import { UserInformationService } from '../../Services/user-information.service';

@Component({
  selector: 'app-verify-modal',
  templateUrl: './verify-modal.component.html',
  styleUrl: './verify-modal.component.scss'
})
export class VerifyModalComponent{
  @Input() isOpen: boolean = false;
  @Output() close = new EventEmitter<void>();
  @Output() isVerified = new EventEmitter<boolean>();
  passwordVisible: boolean = false;
  errorMessage: string = '';

  constructor(private userInfoService: UserInformationService, private userService: UserService, private viewportScroller: ViewportScroller) {
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

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

  submit(password: string) {
    this.userInfoService.loggedUserEmail$.pipe(first()).subscribe((email) => {
      if (email) {
        this.userService.login(email, password).subscribe({
          next: (response) => {
            this.viewportScroller.scrollToPosition([0, 0]); // scroll to top
            this.errorMessage = '';
            this.isVerified.emit(true);
            this.closeModal();
          },
          error: (error) => {
            this.errorMessage = 'Invalid Password.'; // Display error message
            console.error('Login failed:', error);
            this.isVerified.emit(false);
          }
        });
      }
    });
  }

}
