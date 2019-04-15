import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CTAComponent } from './cta.component';

describe('CTAComponent', () => {
  let component: CTAComponent;
  let fixture: ComponentFixture<CTAComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CTAComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CTAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
