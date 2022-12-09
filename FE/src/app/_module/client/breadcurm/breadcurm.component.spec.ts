import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreadcurmComponent } from './breadcurm.component';

describe('BreadcurmComponent', () => {
  let component: BreadcurmComponent;
  let fixture: ComponentFixture<BreadcurmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BreadcurmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BreadcurmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
