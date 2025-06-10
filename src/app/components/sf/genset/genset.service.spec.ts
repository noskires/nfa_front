import { TestBed } from '@angular/core/testing';

import { GensetService } from './genset.service';

describe('GensetService', () => {
  let service: GensetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GensetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
