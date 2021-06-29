import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClockpageComponent } from './clockpage.component';

describe('ClockpageComponent', () => {
  let component: ClockpageComponent;
  let fixture: ComponentFixture<ClockpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClockpageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClockpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
