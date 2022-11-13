import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmsClassInformationComponent } from './cms-class-information.component';

describe('CmsClassInformationComponent', () => {
  let component: CmsClassInformationComponent;
  let fixture: ComponentFixture<CmsClassInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CmsClassInformationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CmsClassInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
