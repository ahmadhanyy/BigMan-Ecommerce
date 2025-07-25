import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchListCardComponent } from './branch-list-card.component';

describe('BranchListCardComponent', () => {
  let component: BranchListCardComponent;
  let fixture: ComponentFixture<BranchListCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BranchListCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BranchListCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
