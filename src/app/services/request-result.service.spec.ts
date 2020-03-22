import { TestBed } from '@angular/core/testing';

import { RequestResultService } from './request-result.service';

describe('RequestResultService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RequestResultService = TestBed.get(RequestResultService);
    expect(service).toBeTruthy();
  });
});
