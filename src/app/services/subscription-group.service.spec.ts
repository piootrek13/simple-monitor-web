import { TestBed } from '@angular/core/testing';

import { SubscriptionGroupService } from './subscription-group.service';

describe('SubscriptionGroupService', () => {
  let service: SubscriptionGroupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubscriptionGroupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
