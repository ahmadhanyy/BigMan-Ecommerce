import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserService } from '../../Services/user.service';
import { ModalService } from '../../Services/modal.service';

@Component({
  selector: 'app-logout-dialog',
  templateUrl: './logout-dialog.component.html',
  styleUrl: './logout-dialog.component.scss'
})
export class LogoutDialogComponent {
  @Input() isOpen: boolean = false;
  @Output() close = new EventEmitter<void>();

  constructor(private userService: UserService, private modalService: ModalService){}

  closeModal() {
    this.close.emit();
  }

  confirmLogout() {
    this.userService.logout();
    this.modalService.logoutDialogSubject.next(false); // Close the modal after logout
  }

  cancelLogout() {
    this.closeModal(); // Close modal when cancel button is clicked
  }
}
