import { TestBed } from '@angular/core/testing';

import { UserSubscribeLocationService } from './user-subscribe-location.service';

describe('UserSubscribeLocationService', () => {
  let service: UserSubscribeLocationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserSubscribeLocationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
