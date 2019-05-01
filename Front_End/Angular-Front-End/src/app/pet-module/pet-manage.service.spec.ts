import { TestBed } from '@angular/core/testing';

import { PetManageService } from './pet-manage.service';

describe('PetManageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PetManageService = TestBed.get(PetManageService);
    expect(service).toBeTruthy();
  });
});
