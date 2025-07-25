import { Component, Input } from '@angular/core';
import { IUser } from '../../Interfaces/iuser';

@Component({
  selector: 'app-user-list-card',
  templateUrl: './user-list-card.component.html',
  styleUrl: './user-list-card.component.scss'
})
export class UserListCardComponent {
  @Input() user!: IUser;

  editUser(){}

  removeUser(){}
}
