import { Component, OnInit } from '@angular/core';
import { UserService } from './Services/user.service';
import { IUser } from './Interfaces/iuser';
import { UserInformationService } from './Services/user-information.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'BigMan Gym';
  user: IUser | null = null;
  isAdmin: boolean = false;

  constructor(private userService: UserService, private userInfoService: UserInformationService) {
    this.userInfoService.loggedUserEmailSubject.next(this.userService.getEmail());
  }

  ngOnInit(): void {
    this.userInfoService.loggedUserEmail$.subscribe(email => {
      if (email === null){
        this.isAdmin = false;
      }else{
        this.userService.getUserByEmail(email).subscribe(user => {
          this.user = user[0];
          if(this.user.isAdmin === true){
            this.isAdmin = true;
          }
          else{
            this.isAdmin = false;
          }
        });
      }
    });
  }
}
