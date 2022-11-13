import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmsClassFeeComponent } from './cms-class-fee.component';

describe('CmsClassFeeComponent', () => {
  let component: CmsClassFeeComponent;
  let fixture: ComponentFixture<CmsClassFeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CmsClassFeeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CmsClassFeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
