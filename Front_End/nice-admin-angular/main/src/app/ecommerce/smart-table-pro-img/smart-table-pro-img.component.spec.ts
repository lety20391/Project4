import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartTableProImgComponent } from './smart-table-pro-img.component';

describe('SmartTableProImgComponent', () => {
  let component: SmartTableProImgComponent;
  let fixture: ComponentFixture<SmartTableProImgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmartTableProImgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmartTableProImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
