import { TestBed } from '@angular/core/testing';

import { JWTHeaderService } from './jwtheader.service';

describe('JWTHeaderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: JWTHeaderService = TestBed.get(JWTHeaderService);
    expect(service).toBeTruthy();
  });
});
