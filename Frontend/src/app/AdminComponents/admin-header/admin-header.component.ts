import { Component, Renderer2 } from '@angular/core';
import { ModalService } from '../../Services/modal.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrl: './admin-header.component.scss'
})
export class AdminHeaderComponent {
  userEmail: string | null = null;
  loginText: string = 'Welcome Boss';
  isLogoutModalOpen = false;
  isUserLoggedIn: boolean = false;
  isloginOpen = false;
  searchQuery: string = '';

  toggleLogin() {
    this.isloginOpen = !this.isloginOpen;
  }

  constructor(private renderer: Renderer2,
              private modalService: ModalService,
              private router: Router) {}

  ngOnInit(): void {
    // Subscribe to the logoutDialogOpen$ observable to get real-time updates
    this.modalService.logoutDialogOpen$.subscribe(isOpen => {
      this.isLogoutModalOpen = isOpen;
    });
  }

  onLogout(){
    this.isLogoutModalOpen = true;
    this.isloginOpen = false;
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
      this.router.navigate(['/adminSearch', query]);
      this.searchQuery = ''; // Optional: clear input
    }
  }

}
