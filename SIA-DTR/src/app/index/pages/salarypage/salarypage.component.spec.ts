import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalarypageComponent } from './salarypage.component';

describe('SalarypageComponent', () => {
  let component: SalarypageComponent;
  let fixture: ComponentFixture<SalarypageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalarypageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalarypageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
