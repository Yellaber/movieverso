export class MockCarouselService {
  initializer = jest.fn();
  getScrollStep = jest.fn().mockReturnValue(0);
  hasPrevious = jest.fn().mockReturnValue(false);
  hasNext = jest.fn().mockReturnValue(true);
  next = jest.fn();
  previous = jest.fn();
}
