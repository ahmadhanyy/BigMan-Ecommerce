import { Component, Input, Renderer2 } from '@angular/core';
import { ICoach } from '../../Interfaces/icoach';
import { CoachService } from '../../Services/coach.service';
import { ModalService } from '../../Services/modal.service';
import { UserService } from '../../Services/user.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-coach-list-card',
  templateUrl: './coach-list-card.component.html',
  styleUrl: './coach-list-card.component.scss'
})
export class CoachListCardComponent {
  apiUrl = environment.imageApi;
  @Input() card!: ICoach;
  isModalCoachOpen = false;
  isModalLoginOpen = false;

  constructor(public coachService: CoachService,
    private renderer: Renderer2,
    private modalService: ModalService,
    private userService: UserService) {}

  openModal() {
    if(this.userService.isLoggedIn()) {
      this.isModalCoachOpen = true;
      this.renderer.addClass(document.body, 'modal-open');
    }
    else {
      this.modalService.openLoginModal();
      this.renderer.addClass(document.body, 'modal-open');
    }
  }

  closeCoachModal() {
    this.isModalCoachOpen = false;
    this.renderer.removeClass(document.body, 'modal-open');
  }

  closeLoginModal() {
    this.modalService.closeLoginModal();
    this.renderer.removeClass(document.body, 'modal-open'); // Remove the modal-open class to <body>
  }

}
