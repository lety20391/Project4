import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductMockupComponent } from './product-mockup.component';

describe('ProductMockupComponent', () => {
  let component: ProductMockupComponent;
  let fixture: ComponentFixture<ProductMockupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductMockupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductMockupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
