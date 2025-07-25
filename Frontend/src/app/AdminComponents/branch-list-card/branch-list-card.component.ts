import { Component, Input } from '@angular/core';
import { IBranch } from '../../Interfaces/ibranch';

@Component({
  selector: 'app-branch-list-card',
  templateUrl: './branch-list-card.component.html',
  styleUrl: './branch-list-card.component.scss'
})
export class BranchListCardComponent {
  @Input() branch!: IBranch;

  editBranch(){}

  removeBranch(){}
}
