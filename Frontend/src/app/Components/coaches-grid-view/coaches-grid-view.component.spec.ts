import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachesGridViewComponent } from './coaches-grid-view.component';

describe('CoachesGridViewComponent', () => {
  let component: CoachesGridViewComponent;
  let fixture: ComponentFixture<CoachesGridViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CoachesGridViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CoachesGridViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
