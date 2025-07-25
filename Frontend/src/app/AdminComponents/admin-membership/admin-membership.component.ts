import { Component } from '@angular/core';
import { IMembership } from '../../Interfaces/imembership';
import { MembershipService } from '../../Services/membership.service';

@Component({
  selector: 'app-admin-membership',
  templateUrl: './admin-membership.component.html',
  styleUrl: './admin-membership.component.scss'
})
export class AdminMembershipComponent {
  membership: IMembership[] = [];
  isLoading: boolean = true;

  constructor(private membershipService: MembershipService) {}

  ngOnInit(): void {
    this.membershipService.getMemberships().subscribe(
      (res: any) => {
        console.log('res: ', res);
        this.isLoading = false;
        this.membership = res.data;
      },
      (err) => {
        this.isLoading = true;
        console.error(err);
      }
    );
  }
}
