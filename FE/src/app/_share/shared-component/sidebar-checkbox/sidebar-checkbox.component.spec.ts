import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarCheckboxComponent } from './sidebar-checkbox.component';

describe('SidebarCheckboxComponent', () => {
  let component: SidebarCheckboxComponent;
  let fixture: ComponentFixture<SidebarCheckboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidebarCheckboxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
