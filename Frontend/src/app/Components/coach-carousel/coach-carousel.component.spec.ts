import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachCarouselComponent } from './coach-carousel.component';

describe('CoachCarouselComponent', () => {
  let component: CoachCarouselComponent;
  let fixture: ComponentFixture<CoachCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CoachCarouselComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CoachCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
