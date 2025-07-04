import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductGridCardComponent } from './product-grid-card.component';

describe('ProductGridCardComponent', () => {
  let component: ProductGridCardComponent;
  let fixture: ComponentFixture<ProductGridCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductGridCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductGridCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
