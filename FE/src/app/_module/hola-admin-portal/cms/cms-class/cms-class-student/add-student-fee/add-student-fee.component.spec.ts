import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStudentFeeComponent } from './add-student-fee.component';

describe('AddStudentFeeComponent', () => {
  let component: AddStudentFeeComponent;
  let fixture: ComponentFixture<AddStudentFeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddStudentFeeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddStudentFeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
