import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembershipListCardComponent } from './membership-list-card.component';

describe('MembershipListCardComponent', () => {
  let component: MembershipListCardComponent;
  let fixture: ComponentFixture<MembershipListCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MembershipListCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MembershipListCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
