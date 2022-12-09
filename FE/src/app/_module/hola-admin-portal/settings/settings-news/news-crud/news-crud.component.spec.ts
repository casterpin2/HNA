import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsCrudComponent } from './news-crud.component';

describe('NewsCrudComponent', () => {
  let component: NewsCrudComponent;
  let fixture: ComponentFixture<NewsCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewsCrudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
