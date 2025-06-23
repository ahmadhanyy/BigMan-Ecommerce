import { Component, OnChanges, OnInit, Renderer2 } from '@angular/core';
import { ModalService } from '../../Services/modal.service';
import { UserService } from '../../Services/user.service';
import { CartItemService } from '../../Services/cart-item.service';
import { UserInformationService } from '../../Services/user-information.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  cartCount: number = 0;
  loginText: string = '';
  isLoginModalOpen = false;
  isRegisterModalOpen = false;
  isLogoutModalOpen = false;
  isUserLoggedIn: boolean = false;

  constructor(private renderer: Renderer2,
              private modalService: ModalService,
              private userService: UserService,
              private userInfoService: UserInformationService) {}

  ngOnInit(): void {
    // Subscribe to the cartCount observable to get real-time updates
    this.userInfoService.cartCount$.subscribe(count => {
      this.cartCount = count;
    });

    // Subscribe to the loginModalOpen$ observable to get real-time updates
    this.modalService.loginModalOpen$.subscribe(isOpen => {
      this.isLoginModalOpen = isOpen;
    });

    // Subscribe to the registerModalOpen$ observable to get real-time updates
    this.modalService.registerModalOpen$.subscribe(isOpen => {
      this.isRegisterModalOpen = isOpen;
    });

    // Subscribe to the logoutDialogOpen$ observable to get real-time updates
    this.modalService.logoutDialogOpen$.subscribe(isOpen => {
      this.isLogoutModalOpen = isOpen;
    });

    this.userService.loggedUserEmail$.subscribe(email => {
      if (email) {
        this.loginText = `Welcome`;
        this.isUserLoggedIn = true;
      } else {
        this.loginText = 'Log in';
        this.isUserLoggedIn = false;
      }
    });
  }

  onLogin() {
    this.isLoginModalOpen = true;
  }

  onRegister() {
    this.isRegisterModalOpen = true;
  }

  onLogout(){
    this.isLogoutModalOpen = true;
  }

  openLoginModal() {
    this.modalService.openLoginModal();
    this.renderer.addClass(document.body, 'modal-open'); // Add the modal-open class to <body>
  }

  closeLoginModal() {
    this.modalService.closeLoginModal();
    this.renderer.removeClass(document.body, 'modal-open'); // Remove the modal-open class to <body>
  }

  openRegisterModal() {
    this.modalService.openRegisterModal();
    this.renderer.addClass(document.body, 'modal-open'); // Add the modal-open class to <body>
  }

  closeRegisterModal() {
    this.modalService.closeRegisterModal();
    this.renderer.removeClass(document.body, 'modal-open'); // Remove the modal-open class to <body>
  }

  openLogoutModal() {
    this.modalService.openLogoutModal();
    this.renderer.addClass(document.body, 'modal-open'); // Add the modal-open class to <body>
  }

  closeLogoutModal() {
    this.modalService.closeLogoutModal();
    this.renderer.removeClass(document.body, 'modal-open'); // Remove the modal-open class to <body>
  }
}
