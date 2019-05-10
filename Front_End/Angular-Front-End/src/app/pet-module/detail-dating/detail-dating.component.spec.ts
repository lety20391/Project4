import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailDatingComponent } from './detail-dating.component';

describe('DetailDatingComponent', () => {
  let component: DetailDatingComponent;
  let fixture: ComponentFixture<DetailDatingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailDatingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailDatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
