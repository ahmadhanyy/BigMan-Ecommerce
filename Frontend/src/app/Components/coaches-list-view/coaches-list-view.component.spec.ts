import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachesListViewComponent } from './coaches-list-view.component';

describe('CoachesListViewComponent', () => {
  let component: CoachesListViewComponent;
  let fixture: ComponentFixture<CoachesListViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CoachesListViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CoachesListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
