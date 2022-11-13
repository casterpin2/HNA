import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TTemplateContentLayoutComponent } from './t-template-content-layout.component';

describe('TTemplateContentLayoutComponent', () => {
  let component: TTemplateContentLayoutComponent;
  let fixture: ComponentFixture<TTemplateContentLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TTemplateContentLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TTemplateContentLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
