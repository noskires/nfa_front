import { TestBed } from '@angular/core/testing';

import { OspmService } from './ospm.service';

describe('OspmService', () => {
  let service: OspmService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OspmService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
