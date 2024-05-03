import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ownerlist1Component } from './ownerlist1.component';

describe('Ownerlist1Component', () => {
  let component: Ownerlist1Component;
  let fixture: ComponentFixture<Ownerlist1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Ownerlist1Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Ownerlist1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
