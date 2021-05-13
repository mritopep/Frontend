import { TestBed } from '@angular/core/testing';

import { CloudstorageService } from './cloudstorage.service';

describe('CloudstorageService', () => {
  let service: CloudstorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CloudstorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
