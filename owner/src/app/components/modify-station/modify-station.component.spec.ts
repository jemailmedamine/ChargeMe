import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyStationComponent } from './modify-station.component';

describe('ModifyStationComponent', () => {
  let component: ModifyStationComponent;
  let fixture: ComponentFixture<ModifyStationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModifyStationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModifyStationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
