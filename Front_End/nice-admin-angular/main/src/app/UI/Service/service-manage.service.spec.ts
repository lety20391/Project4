import { TestBed } from '@angular/core/testing';

import { ServiceManageService } from './service-manage.service';

describe('ServiceManageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServiceManageService = TestBed.get(ServiceManageService);
    expect(service).toBeTruthy();
  });
});
