import { TestBed } from '@angular/core/testing';
import { CacheService } from './cache-service';

describe('CacheService', () => {
  let service: CacheService;
  let dateNowSpy: jest.SpyInstance;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CacheService);
  });

  afterEach(() => {
    dateNowSpy?.mockRestore();
  });

  describe('get()', () => {
    it('returns null for a missing key', () => {
      expect(service.get('nonexistent')).toBeNull();
    });

    it('returns the value when set without TTL', () => {
      service.set('key', 'value');
      expect(service.get('key')).toBe('value');
    });

    it('returns the value before TTL expires', () => {
      const now = 1000;
      dateNowSpy = jest.spyOn(Date, 'now').mockReturnValue(now);
      service.set('key', 'value', 5000);

      dateNowSpy.mockReturnValue(now + 4999);
      expect(service.get('key')).toBe('value');
    });

    it('returns null and removes entry after TTL expires', () => {
      const now = 1000;
      dateNowSpy = jest.spyOn(Date, 'now').mockReturnValue(now);
      service.set('key', 'value', 5000);

      dateNowSpy.mockReturnValue(now + 5000);
      expect(service.get('key')).toBeNull();

      // Entry removed — subsequent call also null
      dateNowSpy.mockReturnValue(now);
      expect(service.get('key')).toBeNull();
    });
  });

  describe('has()', () => {
    it('returns true for a valid non-expired entry', () => {
      const now = 1000;
      dateNowSpy = jest.spyOn(Date, 'now').mockReturnValue(now);
      service.set('key', 'value', 5000);

      dateNowSpy.mockReturnValue(now + 4999);
      expect(service.has('key')).toBe(true);
    });

    it('returns false for an expired entry', () => {
      const now = 1000;
      dateNowSpy = jest.spyOn(Date, 'now').mockReturnValue(now);
      service.set('key', 'value', 5000);

      dateNowSpy.mockReturnValue(now + 5000);
      expect(service.has('key')).toBe(false);
    });

    it('returns false for a missing key', () => {
      expect(service.has('nonexistent')).toBe(false);
    });
  });

  describe('delete()', () => {
    it('removes an existing entry', () => {
      service.set('key', 'value');
      service.delete('key');
      expect(service.get('key')).toBeNull();
      expect(service.has('key')).toBe(false);
    });

    it('does not throw when called on a missing key', () => {
      expect(() => service.delete('nonexistent')).not.toThrow();
    });
  });

  describe('clear()', () => {
    it('removes all entries', () => {
      service.set('a', 1);
      service.set('b', 2);
      service.set('c', 3);
      service.clear();
      expect(service.get('a')).toBeNull();
      expect(service.get('b')).toBeNull();
      expect(service.get('c')).toBeNull();
    });
  });
});
