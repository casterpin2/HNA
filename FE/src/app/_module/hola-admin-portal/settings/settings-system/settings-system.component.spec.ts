import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsSystemComponent } from './settings-system.component';

describe('SettingsSystemComponent', () => {
  let component: SettingsSystemComponent;
  let fixture: ComponentFixture<SettingsSystemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingsSystemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsSystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
