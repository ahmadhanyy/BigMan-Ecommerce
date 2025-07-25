import { Component, Renderer2 } from '@angular/core';
import { ModalService } from '../../Services/modal.service';
import { UserService } from '../../Services/user.service';
import { UserInformationService } from '../../Services/user-information.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  cartCount: number = 0;
  loginText: string = 'Welcome';
  isLoginModalOpen = false;
  isRegisterModalOpen = false;
  isLogoutModalOpen = false;
  isUserLoggedIn: boolean = false;
  searchQuery: string = '';
  isloginOpen = false;


  toggleLogin() {
    this.isloginOpen = !this.isloginOpen;
  }

  constructor(private renderer: Renderer2,
              private modalService: ModalService,
              private userService: UserService,
              private router: Router,
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

    this.userInfoService.loggedUserEmail$.subscribe(email => {
      if (email) {
        this.userService.getUserByEmail(email).subscribe(user => {
        this.loginText = `Welcome ${user[0].username}`;
        });
        this.isUserLoggedIn = true;
        this.isloginOpen = false;
      } else {
        this.loginText = 'Login';
        this.isUserLoggedIn = false;
        this.isloginOpen = false;
      }
    });
  }

  onLogin() {
    this.isLoginModalOpen = true;
    this.isloginOpen = false;
  }

  onRegister() {
    this.isRegisterModalOpen = true;
    this.isloginOpen = false;
  }

  onLogout(){
    this.isLogoutModalOpen = true;
    this.isloginOpen = false;
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

  onSearch() {
    const query = this.searchQuery.trim().toLowerCase();
    if (query) {
      this.router.navigate(['/search', query]);
      this.searchQuery = ''; // Optional: clear input
    }
  }
}
