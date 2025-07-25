import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageListCardComponent } from './message-list-card.component';

describe('MessageListCardComponent', () => {
  let component: MessageListCardComponent;
  let fixture: ComponentFixture<MessageListCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MessageListCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MessageListCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
