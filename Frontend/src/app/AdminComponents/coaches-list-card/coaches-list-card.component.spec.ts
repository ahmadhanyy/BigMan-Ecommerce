import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachListCardComponent } from './coaches-list-card.component';

describe('CoachListCardComponent', () => {
  let component: CoachListCardComponent;
  let fixture: ComponentFixture<CoachListCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CoachListCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoachListCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
