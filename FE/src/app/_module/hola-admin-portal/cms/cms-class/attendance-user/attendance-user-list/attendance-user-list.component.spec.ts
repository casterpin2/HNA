import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceUserListComponent } from './attendance-user-list.component';

describe('AttendanceUserListComponent', () => {
  let component: AttendanceUserListComponent;
  let fixture: ComponentFixture<AttendanceUserListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttendanceUserListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendanceUserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
