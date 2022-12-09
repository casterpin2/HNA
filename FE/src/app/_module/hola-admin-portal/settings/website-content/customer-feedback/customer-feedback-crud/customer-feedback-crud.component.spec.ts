import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerFeedbackCrudComponent } from './customer-feedback-crud.component';

describe('CustomerFeedbackCrudComponent', () => {
  let component: CustomerFeedbackCrudComponent;
  let fixture: ComponentFixture<CustomerFeedbackCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerFeedbackCrudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerFeedbackCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
