import { Component, Input } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ICoach } from '../../Interfaces/icoach';

@Component({
  selector: 'app-coaches-list-card',
  templateUrl: './coaches-list-card.component.html',
  styleUrl: './coaches-list-card.component.scss'
})
export class CoachesListCardComponent {
  apiUrl = environment.imageApi;
  @Input() card!: ICoach;
  userEmail : string | null = null;

  constructor() {}

  editCoach(){}
}
