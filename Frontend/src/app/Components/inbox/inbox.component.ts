import { Component, OnInit } from '@angular/core';
import { IMessage } from '../../Interfaces/imessage';
import { MessageService } from '../../Services/message.service';
import { UserService } from '../../Services/user.service';
import { ProductService } from '../../Services/product.service';
import { CoachService } from '../../Services/coach.service';
import { IProduct } from '../../Interfaces/iproduct';
import { ICoach } from '../../Interfaces/icoach';
import { ModalService } from '../../Services/modal.service';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrl: './inbox.component.scss'
})
export class InboxComponent implements OnInit {
  messagesList: IMessage[] = [];
  showAllMsg: boolean = false;

  constructor(private messageService: MessageService,
              private userService: UserService,
              private prodService: ProductService,
              private coachService: CoachService,
              private modalService: ModalService) {}

  ngOnInit(): void {
    this.userService.loggedUserEmail$.subscribe(email => {
      if (email) {
        this.messageService.getMessagesByEmail(email).subscribe(messages => {
          this.messagesList = messages;
        });
      }
    });
  }

  getProdOnMessage(prodDocId: string | undefined): IProduct | null {
    let product: IProduct | null = null;
    if(prodDocId) {
      this.prodService.getProductByDocId(prodDocId).subscribe(prod => {
        product = prod;
    });
    }
    return product;
  }

  getCoachOnMessage(coachDocId: string | undefined): ICoach | null {
    let coach: ICoach | null = null;
    if(coachDocId) {
      this.coachService.getCoachByDocId(coachDocId).subscribe(coach => {
        coach = coach;
    });
    }
    return coach;
  }

  get visibleMsg() {
    return this.showAllMsg ? this.messagesList  : this.messagesList.slice(0, 5); // Show 5 messages by default
  }

  showMoreMsg() {
    this.showAllMsg = true;
  }
}
