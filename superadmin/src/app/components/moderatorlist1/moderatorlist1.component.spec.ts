import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Moderatorlist1Component } from './moderatorlist1.component';

describe('Moderatorlist1Component', () => {
  let component: Moderatorlist1Component;
  let fixture: ComponentFixture<Moderatorlist1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Moderatorlist1Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Moderatorlist1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
