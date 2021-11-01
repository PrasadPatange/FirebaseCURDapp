import { TestBed } from '@angular/core/testing';

import { Customer1Service } from './customer1.service';

describe('Customer1Service', () => {
  let service: Customer1Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Customer1Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
