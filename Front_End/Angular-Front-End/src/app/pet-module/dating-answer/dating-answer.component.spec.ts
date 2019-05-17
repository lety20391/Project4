import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatingAnswerComponent } from './dating-answer.component';

describe('DatingAnswerComponent', () => {
  let component: DatingAnswerComponent;
  let fixture: ComponentFixture<DatingAnswerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatingAnswerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatingAnswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
