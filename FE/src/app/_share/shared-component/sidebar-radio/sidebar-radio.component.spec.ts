import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarRadioComponent } from './sidebar-radio.component';

describe('SidebarRadioComponent', () => {
  let component: SidebarRadioComponent;
  let fixture: ComponentFixture<SidebarRadioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidebarRadioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarRadioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
