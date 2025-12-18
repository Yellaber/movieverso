export class MockScrollService {
  isAtBottom = jest.fn().mockReturnValue(false);
  getScrollTop = jest.fn().mockReturnValue(0);
  scrollTop = jest.fn();
  saveScrollPosition = jest.fn();
  restoreScrollPosition = jest.fn();
  blockWindow = jest.fn();
}
