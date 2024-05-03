import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Reservation1Component } from './reservation1.component';

describe('Reservation1Component', () => {
  let component: Reservation1Component;
  let fixture: ComponentFixture<Reservation1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Reservation1Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Reservation1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
