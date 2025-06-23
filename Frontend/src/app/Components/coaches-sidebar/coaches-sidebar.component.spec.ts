import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachesSidebarComponent } from './coaches-sidebar.component';

describe('CoachesSidebarComponent', () => {
  let component: CoachesSidebarComponent;
  let fixture: ComponentFixture<CoachesSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CoachesSidebarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CoachesSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
