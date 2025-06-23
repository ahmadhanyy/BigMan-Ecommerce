import { Component, OnInit } from '@angular/core';
import { IBranch } from '../../Interfaces/ibranch';
import { BranchService } from '../../Services/branch.service';

@Component({
  selector: 'app-branches',
  templateUrl: './branches.component.html',
  styleUrl: './branches.component.scss'
})
export class BranchesComponent implements OnInit {
  branchesList: IBranch[] = [];

  constructor(private branchService: BranchService) {}

  ngOnInit(): void {
    this.branchService.getBranches().subscribe((response: any) => {
      this.branchesList = response.data;
    });
  }
}
