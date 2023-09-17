import { TestBed } from '@angular/core/testing';

import { LocalStorageAPIService } from './local-storage-api.service';

describe('LocalStorageAPIService', () => {
  let service: LocalStorageAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalStorageAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
