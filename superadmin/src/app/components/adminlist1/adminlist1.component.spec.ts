import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Adminlist1Component } from './adminlist1.component';

describe('Adminlist1Component', () => {
  let component: Adminlist1Component;
  let fixture: ComponentFixture<Adminlist1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Adminlist1Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Adminlist1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
