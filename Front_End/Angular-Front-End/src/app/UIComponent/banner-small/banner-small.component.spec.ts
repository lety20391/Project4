import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerSmallComponent } from './banner-small.component';

describe('BannerSmallComponent', () => {
  let component: BannerSmallComponent;
  let fixture: ComponentFixture<BannerSmallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BannerSmallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BannerSmallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
