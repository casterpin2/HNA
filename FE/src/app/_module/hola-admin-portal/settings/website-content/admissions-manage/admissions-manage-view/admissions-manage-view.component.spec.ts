import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmissionsManageViewComponent } from './admissions-manage-view.component';

describe('AdmissionsManageViewComponent', () => {
  let component: AdmissionsManageViewComponent;
  let fixture: ComponentFixture<AdmissionsManageViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdmissionsManageViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmissionsManageViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
