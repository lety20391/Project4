import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatingRequestComponent } from './dating-request.component';

describe('DatingRequestComponent', () => {
  let component: DatingRequestComponent;
  let fixture: ComponentFixture<DatingRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatingRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatingRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
