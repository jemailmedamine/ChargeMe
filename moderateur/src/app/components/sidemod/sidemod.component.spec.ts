import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidemodComponent } from './sidemod.component';

describe('SidemodComponent', () => {
  let component: SidemodComponent;
  let fixture: ComponentFixture<SidemodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SidemodComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SidemodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
