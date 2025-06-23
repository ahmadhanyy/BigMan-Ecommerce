import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesButtonComponent } from './categories-button.component';

describe('CategoriesButtonComponent', () => {
  let component: CategoriesButtonComponent;
  let fixture: ComponentFixture<CategoriesButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CategoriesButtonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CategoriesButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
