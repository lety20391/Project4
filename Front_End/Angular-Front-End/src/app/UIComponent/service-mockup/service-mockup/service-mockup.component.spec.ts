import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceMockupComponent } from './service-mockup.component';

describe('ServiceMockupComponent', () => {
  let component: ServiceMockupComponent;
  let fixture: ComponentFixture<ServiceMockupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceMockupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceMockupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
