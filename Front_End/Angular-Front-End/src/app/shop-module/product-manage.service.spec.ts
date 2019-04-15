import { TestBed } from '@angular/core/testing';

import { ProductManageService } from './product-manage.service';

describe('ProductManageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProductManageService = TestBed.get(ProductManageService);
    expect(service).toBeTruthy();
  });
});
