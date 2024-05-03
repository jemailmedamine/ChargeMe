import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Stationlist1Component } from './stationlist1.component';

describe('Stationlist1Component', () => {
  let component: Stationlist1Component;
  let fixture: ComponentFixture<Stationlist1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Stationlist1Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Stationlist1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
