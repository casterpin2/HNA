import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingMenuModalComponent } from './setting-menu-modal.component';

describe('SettingMenuModalComponent', () => {
  let component: SettingMenuModalComponent;
  let fixture: ComponentFixture<SettingMenuModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingMenuModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingMenuModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
