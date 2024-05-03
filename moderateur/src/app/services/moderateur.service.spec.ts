import { TestBed } from '@angular/core/testing';

import { ModerateurService } from './moderateur.service';

describe('ModerateurService', () => {
  let service: ModerateurService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModerateurService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
