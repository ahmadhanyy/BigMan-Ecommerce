import { Component, OnInit } from '@angular/core';
import { ICoach } from '../../Interfaces/icoach';
import { CoachService } from '../../Services/coach.service';

@Component({
  selector: 'app-coaches-list-view',
  templateUrl: './coaches-list-view.component.html',
  styleUrl: './coaches-list-view.component.scss'
})
export class CoachesListViewComponent implements OnInit {
  coachesList: ICoach[] = [];

  constructor(public coachService: CoachService) {}

  ngOnInit(): void {
    this.coachService.getCoaches().subscribe((response: any) => {
      this.coachesList = response.data;
    });
  }

}
