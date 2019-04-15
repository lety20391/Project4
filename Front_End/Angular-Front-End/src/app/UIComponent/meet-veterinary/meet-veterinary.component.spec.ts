import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetVeterinaryComponent } from './meet-veterinary.component';

describe('MeetVeterinaryComponent', () => {
  let component: MeetVeterinaryComponent;
  let fixture: ComponentFixture<MeetVeterinaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeetVeterinaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeetVeterinaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
