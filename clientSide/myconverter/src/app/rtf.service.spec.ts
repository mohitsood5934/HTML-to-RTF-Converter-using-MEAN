import { TestBed } from '@angular/core/testing';

import { RtfService } from './rtf.service';

describe('RtfService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RtfService = TestBed.get(RtfService);
    expect(service).toBeTruthy();
  });
});
