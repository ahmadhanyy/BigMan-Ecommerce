import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  loginModalSubject = new BehaviorSubject<boolean>(false);
  loginModalOpen$ = this.loginModalSubject.asObservable();

  registerModalSubject = new BehaviorSubject<boolean>(false);
  registerModalOpen$ = this.registerModalSubject.asObservable();

  logoutDialogSubject = new BehaviorSubject<boolean>(false);
  logoutDialogOpen$ = this.logoutDialogSubject.asObservable();

  openLoginModal() {
    this.loginModalSubject.next(true);
  }

  closeLoginModal() {
    this.loginModalSubject.next(false);
  }

  openRegisterModal() {
    this.registerModalSubject.next(true);
  }

  closeRegisterModal() {
    this.registerModalSubject.next(false);
  }

  openLogoutModal() {
    this.logoutDialogSubject.next(true);
  }

  closeLogoutModal() {
    this.logoutDialogSubject.next(false);
  }

}
