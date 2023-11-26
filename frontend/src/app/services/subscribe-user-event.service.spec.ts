import { TestBed } from '@angular/core/testing';

import { SubscribeUserEventService } from './subscribe-user-event.service';

describe('SubscribeUserEventService', () => {
  let service: SubscribeUserEventService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubscribeUserEventService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
