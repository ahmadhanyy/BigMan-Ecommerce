import { Component, Input } from '@angular/core';
import { ICoach } from '../../Interfaces/icoach';

@Component({
  selector: 'app-coaches-list-view',
  templateUrl: './coaches-list-view.component.html',
  styleUrl: './coaches-list-view.component.scss'
})
export class CoachesListViewComponent {
  @Input() coachList: ICoach[] = [];
  @Input() isLoading: boolean = true;

}
