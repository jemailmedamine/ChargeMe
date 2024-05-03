import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsOwnerComponent } from './details-owner.component';

describe('DetailsOwnerComponent', () => {
  let component: DetailsOwnerComponent;
  let fixture: ComponentFixture<DetailsOwnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetailsOwnerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailsOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
