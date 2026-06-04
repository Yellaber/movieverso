import { TestBed } from '@angular/core/testing';
import { CarouselCacheService } from './carousel-cache-service';

describe('CarouselCacheService.', () => {
  let service: CarouselCacheService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [CarouselCacheService] });
    service = TestBed.inject(CarouselCacheService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('savePosition().', () => {
    it('Should store the step for a given key.', () => {
      service.savePosition('home-popular', 400);
      expect((service as any).cache.get('home-popular')).toBe(400);
    });

    it('Should overwrite an existing entry for the same key.', () => {
      service.savePosition('home-popular', 400);
      service.savePosition('home-popular', 800);
      expect((service as any).cache.get('home-popular')).toBe(800);
    });
  });

  describe('getPosition().', () => {
    it('Should return the stored step for an existing key.', () => {
      service.savePosition('home-now-playing', 600);
      expect(service.getPosition('home-now-playing')).toBe(600);
    });

    it('Should return undefined for a non-existent key.', () => {
      expect(service.getPosition('non-existent')).toBeUndefined();
    });
  });
});
