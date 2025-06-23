import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachGridCardComponent } from './coach-grid-card.component';

describe('CoachGridCardComponent', () => {
  let component: CoachGridCardComponent;
  let fixture: ComponentFixture<CoachGridCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CoachGridCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CoachGridCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
