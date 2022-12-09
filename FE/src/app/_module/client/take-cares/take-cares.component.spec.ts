import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TakeCaresComponent } from './take-cares.component';

describe('TakeCaresComponent', () => {
  let component: TakeCaresComponent;
  let fixture: ComponentFixture<TakeCaresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TakeCaresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TakeCaresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
