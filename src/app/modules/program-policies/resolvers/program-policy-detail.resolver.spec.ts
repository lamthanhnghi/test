import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { programPolicyDetailResolver } from './program-policy-detail.resolver';

describe('programPolicyDetailResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) =>
    TestBed.runInInjectionContext(() => programPolicyDetailResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
