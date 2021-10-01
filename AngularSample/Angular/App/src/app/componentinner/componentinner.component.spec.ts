import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentinnerComponent } from './componentinner.component';

describe('ComponentinnerComponent', () => {
  let component: ComponentinnerComponent;
  let fixture: ComponentFixture<ComponentinnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComponentinnerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
