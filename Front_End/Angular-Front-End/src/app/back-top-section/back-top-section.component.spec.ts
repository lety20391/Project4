import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BackTopSectionComponent } from './back-top-section.component';

describe('BackTopSectionComponent', () => {
  let component: BackTopSectionComponent;
  let fixture: ComponentFixture<BackTopSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BackTopSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BackTopSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
