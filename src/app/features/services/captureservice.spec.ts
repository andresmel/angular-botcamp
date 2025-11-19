import { TestBed } from '@angular/core/testing';

import { Captureservice } from './captureservice';

describe('Captureservice', () => {
  let service: Captureservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Captureservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
