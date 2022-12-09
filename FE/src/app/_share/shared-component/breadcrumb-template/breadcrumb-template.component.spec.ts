import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreadcrumbTemplateComponent } from './breadcrumb-template.component';

describe('BreadcrumbTemplateComponent', () => {
  let component: BreadcrumbTemplateComponent;
  let fixture: ComponentFixture<BreadcrumbTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BreadcrumbTemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BreadcrumbTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
