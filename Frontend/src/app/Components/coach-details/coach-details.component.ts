import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { ICoach } from '../../Interfaces/icoach';
import { CoachService } from '../../Services/coach.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-coach-details',
  templateUrl: './coach-details.component.html',
  styleUrl: './coach-details.component.scss'
})
export class CoachDetailsComponent {
  apiUrl = environment.imageApi;
  @Input() card!: ICoach;
  chosenTime: any = { "day": '', "hour": '' };
  showAllSessions = false;

  constructor(public coachService: CoachService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Subscribe to route parameters to determine if an id is passed
    this.route.paramMap.subscribe((params) => {
      // Extract product ID, if present, otherwise it will be NaN
      const coachId = Number(params.get('id'));
      this.coachService.getCoachById(coachId).subscribe((response: any) => {
        this.card = response.data[0];
        // Initialize the chosen session time
        if (this.card.coach_times && this.card.coach_times.length > 0) {
          this.chosenTime = this.card.coach_times[0];
        }
      });
    });
  }

  chooseTime(time: any) {
    this.chosenTime = time;
  }

  contact(coach: ICoach) {
  }

  // Computed properties to determine visible items
  get visibleSessions() {
    if (this.card.coach_times) {
      return this.showAllSessions ? this.card.coach_times : this.card.coach_times.slice(0, 10); // Show 10 Sessions
    }
    else {
      return [];
    }
  }

  // Methods to show more Sessions
  showMoreSessions() {
    this.showAllSessions = true;
  }
}
