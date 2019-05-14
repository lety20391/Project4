import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartTableLabelComponent } from './smart-table-label.component';

describe('SmartTableLabelComponent', () => {
  let component: SmartTableLabelComponent;
  let fixture: ComponentFixture<SmartTableLabelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmartTableLabelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmartTableLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
