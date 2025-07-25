import { Component, Input } from '@angular/core';
import { IMembership } from '../../Interfaces/imembership';

@Component({
  selector: 'app-membership-list-card',
  templateUrl: './membership-list-card.component.html',
  styleUrl: './membership-list-card.component.scss'
})
export class MembershipListCardComponent {
  @Input() membership!: IMembership;

  editMembership(){}

  removeMembership(){}
}
