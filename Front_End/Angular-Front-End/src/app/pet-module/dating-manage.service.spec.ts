import { TestBed } from '@angular/core/testing';

import { DatingManageService } from './dating-manage.service';

describe('DatingManageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DatingManageService = TestBed.get(DatingManageService);
    expect(service).toBeTruthy();
  });
});
