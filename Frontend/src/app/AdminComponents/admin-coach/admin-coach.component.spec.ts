import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCoachComponent } from './admin-coach.component';

describe('AdminCoachComponent', () => {
  let component: AdminCoachComponent;
  let fixture: ComponentFixture<AdminCoachComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminCoachComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminCoachComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
