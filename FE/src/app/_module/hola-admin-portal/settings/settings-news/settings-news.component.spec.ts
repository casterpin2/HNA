import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsNewsComponent } from './settings-news.component';

describe('SettingsNewsComponent', () => {
  let component: SettingsNewsComponent;
  let fixture: ComponentFixture<SettingsNewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingsNewsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
