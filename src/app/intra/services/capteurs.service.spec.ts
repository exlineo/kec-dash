import { TestBed } from '@angular/core/testing';

import { CapteursService } from './capteurs.service';

describe('CapteursService', () => {
  let service: CapteursService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CapteursService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
