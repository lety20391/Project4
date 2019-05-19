import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatingCalendarComponent } from './dating-calendar.component';

describe('DatingCalendarComponent', () => {
  let component: DatingCalendarComponent;
  let fixture: ComponentFixture<DatingCalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatingCalendarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatingCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
