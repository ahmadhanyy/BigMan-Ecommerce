import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderListCardComponent } from './order-list-card.component';

describe('OrderListCardComponent', () => {
  let component: OrderListCardComponent;
  let fixture: ComponentFixture<OrderListCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrderListCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OrderListCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
