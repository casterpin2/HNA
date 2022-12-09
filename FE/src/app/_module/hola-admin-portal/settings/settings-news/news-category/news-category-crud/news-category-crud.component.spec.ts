import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsCategoryCrudComponent } from './news-category-crud.component';

describe('NewsCategoryCrudComponent', () => {
  let component: NewsCategoryCrudComponent;
  let fixture: ComponentFixture<NewsCategoryCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewsCategoryCrudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsCategoryCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
