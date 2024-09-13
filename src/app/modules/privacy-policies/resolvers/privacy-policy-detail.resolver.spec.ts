import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { privacyPolicyDetailResolver } from './privacy-policy-detail.resolver';

describe('privacyPolicyDetailResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) =>
    TestBed.runInInjectionContext(() => privacyPolicyDetailResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
