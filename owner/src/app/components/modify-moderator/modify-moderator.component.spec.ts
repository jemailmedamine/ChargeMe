import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyModeratorComponent } from './modify-moderator.component';

describe('ModifyModeratorComponent', () => {
  let component: ModifyModeratorComponent;
  let fixture: ComponentFixture<ModifyModeratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModifyModeratorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModifyModeratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
