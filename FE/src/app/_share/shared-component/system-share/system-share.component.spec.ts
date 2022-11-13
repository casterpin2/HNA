import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemShareComponent } from './system-share.component';

describe('SystemShareComponent', () => {
  let component: SystemShareComponent;
  let fixture: ComponentFixture<SystemShareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SystemShareComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemShareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
