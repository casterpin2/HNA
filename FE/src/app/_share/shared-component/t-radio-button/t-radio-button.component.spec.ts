import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TRadioButtonComponent } from './t-radio-button.component';

describe('TRadioButtonComponent', () => {
  let component: TRadioButtonComponent;
  let fixture: ComponentFixture<TRadioButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TRadioButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TRadioButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
