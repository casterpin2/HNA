import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformationCrudComponent } from './information-crud.component';

describe('InformationCrudComponent', () => {
  let component: InformationCrudComponent;
  let fixture: ComponentFixture<InformationCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformationCrudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InformationCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
