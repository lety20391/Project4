import { TestBed } from '@angular/core/testing';

import { OrderProductService } from './order-product.service';

describe('OrderProductService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OrderProductService = TestBed.get(OrderProductService);
    expect(service).toBeTruthy();
  });
});
