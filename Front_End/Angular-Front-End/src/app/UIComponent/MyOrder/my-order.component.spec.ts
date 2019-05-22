import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceCalendarComponent } from './my-order.component';

describe('ServiceCalendarComponent', () => {
  let component: ServiceCalendarComponent;
  let fixture: ComponentFixture<ServiceCalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceCalendarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
