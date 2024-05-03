import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerSpaceComponent } from './owner-space.component';

describe('OwnerSpaceComponent', () => {
  let component: OwnerSpaceComponent;
  let fixture: ComponentFixture<OwnerSpaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OwnerSpaceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OwnerSpaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
