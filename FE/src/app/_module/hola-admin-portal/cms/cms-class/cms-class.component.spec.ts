import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmsClassComponent } from './cms-class.component';

describe('CmsClassComponent', () => {
  let component: CmsClassComponent;
  let fixture: ComponentFixture<CmsClassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CmsClassComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CmsClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
