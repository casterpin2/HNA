import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEduComponent } from './home-edu.component';

describe('HomeEduComponent', () => {
  let component: HomeEduComponent;
  let fixture: ComponentFixture<HomeEduComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeEduComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeEduComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
