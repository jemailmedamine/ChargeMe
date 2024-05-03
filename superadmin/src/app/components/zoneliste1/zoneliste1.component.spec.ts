import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Zoneliste1Component } from './zoneliste1.component';

describe('Zoneliste1Component', () => {
  let component: Zoneliste1Component;
  let fixture: ComponentFixture<Zoneliste1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Zoneliste1Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Zoneliste1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
