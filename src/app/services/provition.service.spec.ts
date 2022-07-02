import { TestBed } from '@angular/core/testing';

import { ProvitionService } from './provition.service';

describe('ProvitionService', () => {
  let service: ProvitionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProvitionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
