import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseTemplateLayoutComponent } from './course-template-layout.component';

describe('CourseTemplateLayoutComponent', () => {
  let component: CourseTemplateLayoutComponent;
  let fixture: ComponentFixture<CourseTemplateLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseTemplateLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseTemplateLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
