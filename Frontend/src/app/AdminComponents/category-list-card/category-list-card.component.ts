import { Component, Input } from '@angular/core';
import { ICategory } from '../../Interfaces/icategory';

@Component({
  selector: 'app-category-list-card',
  templateUrl: './category-list-card.component.html',
  styleUrl: './category-list-card.component.scss'
})
export class CategoryListCardComponent {
  @Input() category!: ICategory;

  editCategory(){}

  removeCategory(){}

}
