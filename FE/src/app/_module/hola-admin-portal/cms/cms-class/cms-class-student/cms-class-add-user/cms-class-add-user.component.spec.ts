import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmsClassAddUserComponent } from './cms-class-add-user.component';

describe('CmsClassAddUserComponent', () => {
  let component: CmsClassAddUserComponent;
  let fixture: ComponentFixture<CmsClassAddUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CmsClassAddUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CmsClassAddUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
