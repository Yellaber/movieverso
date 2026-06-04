export class MockCarouselCacheService {
  savePosition = jest.fn();
  getPosition = jest.fn().mockReturnValue(undefined);
}
