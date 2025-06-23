import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { ModalService } from '../Services/modal.service';
import { UserService } from '../Services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private userService: UserService, private modalService: ModalService) {}

  canActivate(): boolean {
    if (this.userService.isLoggedIn()) {
      return true;
    } else {
      console.log('You are not logged in');
      this.modalService.openLoginModal();
      return false;
    }
  }
}
