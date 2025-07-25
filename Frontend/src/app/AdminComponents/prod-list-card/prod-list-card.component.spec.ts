import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdListCardComponent } from './prod-list-card.component';

describe('ProdListCardComponent', () => {
  let component: ProdListCardComponent;
  let fixture: ComponentFixture<ProdListCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProdListCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProdListCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
