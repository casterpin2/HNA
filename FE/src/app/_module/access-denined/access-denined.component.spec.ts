import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessDeninedComponent } from './access-denined.component';

describe('AccessDeninedComponent', () => {
  let component: AccessDeninedComponent;
  let fixture: ComponentFixture<AccessDeninedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccessDeninedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccessDeninedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
