import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryIntroduceComponent } from './summary-introduce.component';

describe('SummaryIntroduceComponent', () => {
  let component: SummaryIntroduceComponent;
  let fixture: ComponentFixture<SummaryIntroduceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SummaryIntroduceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SummaryIntroduceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
