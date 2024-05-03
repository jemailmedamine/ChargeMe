import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimModComponent } from './claim-mod.component';

describe('ClaimModComponent', () => {
  let component: ClaimModComponent;
  let fixture: ComponentFixture<ClaimModComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClaimModComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClaimModComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
