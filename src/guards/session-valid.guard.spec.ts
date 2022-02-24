import { TestBed } from '@angular/core/testing';

import { SessionValidGuard } from './session-valid.guard';

describe('SessionValidGuard', () => {
  let guard: SessionValidGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SessionValidGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
