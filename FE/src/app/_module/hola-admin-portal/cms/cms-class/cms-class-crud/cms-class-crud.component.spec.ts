import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmsClassCrudComponent } from './cms-class-crud.component';

describe('CmsClassCrudComponent', () => {
  let component: CmsClassCrudComponent;
  let fixture: ComponentFixture<CmsClassCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CmsClassCrudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CmsClassCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
