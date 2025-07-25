import { Component, Input} from '@angular/core';
import { ICoach } from '../../Interfaces/icoach';

@Component({
  selector: 'app-coaches-grid-view',
  templateUrl: './coaches-grid-view.component.html',
  styleUrl: './coaches-grid-view.component.scss'
})
export class CoachesGridViewComponent {
  @Input() coachRows: ICoach[][] = [];
  @Input() isLoading: boolean = true;

}
