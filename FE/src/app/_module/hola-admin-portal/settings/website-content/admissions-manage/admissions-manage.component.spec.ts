import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmissionsManageComponent } from './admissions-manage.component';

describe('AdmissionsManageComponent', () => {
  let component: AdmissionsManageComponent;
  let fixture: ComponentFixture<AdmissionsManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdmissionsManageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmissionsManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
