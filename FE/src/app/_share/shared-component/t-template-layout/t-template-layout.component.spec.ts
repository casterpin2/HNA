import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TTemplateLayoutComponent } from './t-template-layout.component';

describe('TTemplateLayoutComponent', () => {
  let component: TTemplateLayoutComponent;
  let fixture: ComponentFixture<TTemplateLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TTemplateLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TTemplateLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
