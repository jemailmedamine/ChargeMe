import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeModComponent } from './home-mod.component';

describe('HomeModComponent', () => {
  let component: HomeModComponent;
  let fixture: ComponentFixture<HomeModComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeModComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomeModComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
