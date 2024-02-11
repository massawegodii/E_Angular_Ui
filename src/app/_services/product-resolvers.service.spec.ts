import { TestBed } from '@angular/core/testing';

import { ProductResolversService } from './product-resolvers.service';

describe('ProductResolversService', () => {
  let service: ProductResolversService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductResolversService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
