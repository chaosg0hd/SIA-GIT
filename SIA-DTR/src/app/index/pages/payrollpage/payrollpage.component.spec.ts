import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrollpageComponent } from './payrollpage.component';

describe('PayrollpageComponent', () => {
  let component: PayrollpageComponent;
  let fixture: ComponentFixture<PayrollpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayrollpageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PayrollpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
