import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoucherListCardComponent } from './voucher-list-card.component';

describe('VoucherListCardComponent', () => {
  let component: VoucherListCardComponent;
  let fixture: ComponentFixture<VoucherListCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VoucherListCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VoucherListCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
