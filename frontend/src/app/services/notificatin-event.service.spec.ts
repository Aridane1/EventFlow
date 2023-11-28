import { TestBed } from '@angular/core/testing';

import { NotificatinEventService } from './notificatin-event.service';

describe('NotificatinEventService', () => {
  let service: NotificatinEventService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotificatinEventService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
