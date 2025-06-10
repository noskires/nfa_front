import { TestBed } from '@angular/core/testing';

import { OspmDataService } from './ospm-data.service';

describe('OspmDataService', () => {
  let service: OspmDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OspmDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
