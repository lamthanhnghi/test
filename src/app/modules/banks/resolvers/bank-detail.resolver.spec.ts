import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { bankDetailResolver } from './bank-detail.resolver';

describe('bankDetailResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) =>
    TestBed.runInInjectionContext(() => bankDetailResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
