import { TestBed } from '@angular/core/testing';

import { NotificationLocationService } from './notification-location.service';

describe('NotificationLocationService', () => {
  let service: NotificationLocationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotificationLocationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
