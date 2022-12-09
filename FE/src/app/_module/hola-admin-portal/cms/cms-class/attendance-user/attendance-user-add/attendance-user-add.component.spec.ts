import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceUserAddComponent } from './attendance-user-add.component';

describe('AttendanceUserAddComponent', () => {
  let component: AttendanceUserAddComponent;
  let fixture: ComponentFixture<AttendanceUserAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttendanceUserAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendanceUserAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
