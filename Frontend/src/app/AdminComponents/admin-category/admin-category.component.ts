import { Component } from '@angular/core';
import { ICategory } from '../../Interfaces/icategory';
import { CategoryService } from '../../Services/category.service';

@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrl: './admin-category.component.scss'
})
export class AdminCategoryComponent {
  category: ICategory[] = [];
  isLoading: boolean = true;

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(
      (res: any) => {
        console.log('res: ', res);
        this.isLoading = false;
        this.category = res.data;
      },
      (err) => {
        this.isLoading = true;
        console.error(err);
      }
    );
  }
}
