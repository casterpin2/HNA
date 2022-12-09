import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceUserViewComponent } from './attendance-user-view.component';

describe('AttendanceUserViewComponent', () => {
  let component: AttendanceUserViewComponent;
  let fixture: ComponentFixture<AttendanceUserViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttendanceUserViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendanceUserViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
