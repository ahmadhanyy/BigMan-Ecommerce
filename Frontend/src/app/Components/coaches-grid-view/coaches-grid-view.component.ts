import { Component, OnInit } from '@angular/core';
import { ICoach } from '../../Interfaces/icoach';
import { CoachService } from '../../Services/coach.service';

@Component({
  selector: 'app-coaches-grid-view',
  templateUrl: './coaches-grid-view.component.html',
  styleUrl: './coaches-grid-view.component.scss'
})
export class CoachesGridViewComponent implements OnInit {
  coachRows: ICoach[][] = [];

  constructor(public coachService: CoachService) {}

  ngOnInit(): void {
    this.coachService.getCoaches().subscribe((response: any) => {
      this.coachRows = this.coachService.convertListTo2DList(response.data, 4);
    });
  }

}
