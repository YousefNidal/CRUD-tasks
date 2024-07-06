import { TestBed } from '@angular/core/testing';

import { AdminLoginRejectGuard } from './admin-login-reject.guard';

describe('AdminLoginRejectGuard', () => {
  let guard: AdminLoginRejectGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AdminLoginRejectGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
