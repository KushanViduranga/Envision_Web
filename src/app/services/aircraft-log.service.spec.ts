import { TestBed } from '@angular/core/testing';

import { AircraftLogService } from './aircraft-log.service';

describe('AircraftLogService', () => {
  let service: AircraftLogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AircraftLogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
