import { Component, Input } from '@angular/core';
import { IMessage } from '../../Interfaces/imessage';

@Component({
  selector: 'app-message-list-card',
  templateUrl: './message-list-card.component.html',
  styleUrl: './message-list-card.component.scss'
})
export class MessageListCardComponent {
  @Input() message!: IMessage;

  editMessage(){}

  removeMessage(){}
}
