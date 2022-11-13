import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarDatePickerComponent } from './sidebar-date-picker.component';

describe('SidebarDatePickerComponent', () => {
  let component: SidebarDatePickerComponent;
  let fixture: ComponentFixture<SidebarDatePickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidebarDatePickerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarDatePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
