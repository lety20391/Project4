import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDatingComponent } from './confirm-dating.component';

describe('ConfirmDatingComponent', () => {
  let component: ConfirmDatingComponent;
  let fixture: ComponentFixture<ConfirmDatingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmDatingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmDatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
