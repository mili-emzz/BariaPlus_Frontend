import { TestBed } from '@angular/core/testing';

import { CookiesStorage } from './cookies-storage';

describe('CookiesStorage', () => {
  let service: CookiesStorage;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CookiesStorage);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
