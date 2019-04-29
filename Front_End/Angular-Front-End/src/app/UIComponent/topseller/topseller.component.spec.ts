import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopsellerComponent } from './topseller.component';

describe('TopsellerComponent', () => {
  let component: TopsellerComponent;
  let fixture: ComponentFixture<TopsellerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopsellerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopsellerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
