import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoPetsComponent } from './do-pets.component';

describe('DoPetsComponent', () => {
  let component: DoPetsComponent;
  let fixture: ComponentFixture<DoPetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoPetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoPetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
