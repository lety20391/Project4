import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDatingComponent } from './list-dating.component';

describe('ListDatingComponent', () => {
  let component: ListDatingComponent;
  let fixture: ComponentFixture<ListDatingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListDatingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListDatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
