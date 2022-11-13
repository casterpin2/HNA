import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmsClassStudentComponent } from './cms-class-student.component';

describe('CmsClassStudentComponent', () => {
  let component: CmsClassStudentComponent;
  let fixture: ComponentFixture<CmsClassStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CmsClassStudentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CmsClassStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
