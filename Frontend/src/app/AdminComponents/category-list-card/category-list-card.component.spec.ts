import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryListCardComponent } from './category-list-card.component';

describe('CategoryListCardComponent', () => {
  let component: CategoryListCardComponent;
  let fixture: ComponentFixture<CategoryListCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CategoryListCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CategoryListCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
