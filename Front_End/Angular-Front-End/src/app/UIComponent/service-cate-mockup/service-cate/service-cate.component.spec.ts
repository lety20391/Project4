import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceCateComponent } from './service-cate.component';

describe('ServiceCateComponent', () => {
  let component: ServiceCateComponent;
  let fixture: ComponentFixture<ServiceCateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceCateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceCateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
