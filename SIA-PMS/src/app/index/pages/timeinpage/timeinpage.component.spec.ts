import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeinpageComponent } from './timeinpage.component';

describe('TimeinpageComponent', () => {
  let component: TimeinpageComponent;
  let fixture: ComponentFixture<TimeinpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimeinpageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeinpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
