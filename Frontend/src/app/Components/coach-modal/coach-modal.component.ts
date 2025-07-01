import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { ICoach } from '../../Interfaces/icoach';
import { CoachService } from '../../Services/coach.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-coach-modal',
  templateUrl: './coach-modal.component.html',
  styleUrl: './coach-modal.component.scss'
})
export class CoachModalComponent implements OnInit {
  apiUrl = environment.imageApi;
  @Input() card!: ICoach;
  @Input() isOpen: boolean = false;
  @Output() close = new EventEmitter<void>();
  chosenTime = { "day": '', "time": '' };
  showAllSessions = false;

  constructor(public coachService: CoachService) {
  }

  ngOnInit(): void {
    // Initialize the chosen session time
    if (this.card.coach_times && this.card.coach_times.length > 0) {
      this.chosenTime = this.card.coach_times[0];
      }
  }

  closeModal() {
    this.close.emit();
    this.showAllSessions = false;
    if (this.card.coach_times && this.card.coach_times.length > 0) {
      this.chosenTime = this.card.coach_times[0];
    }
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

  onBackdropClick(event: MouseEvent) {
    if ((event.target as HTMLElement).classList.contains('modal')) {
      this.closeModal(); // Close modal if the user clicks on the backdrop
    }
  }
}
