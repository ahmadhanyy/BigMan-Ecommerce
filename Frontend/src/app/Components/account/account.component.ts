import { Component, OnInit } from '@angular/core';
import { IUser } from '../../Interfaces/iuser';
import { UserService } from '../../Services/user.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss'
})
export class AccountComponent implements OnInit {
  user!: IUser;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
  }

}
