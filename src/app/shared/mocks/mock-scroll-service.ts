export class MockScrollService {
  isAtBottom = jest.fn().mockImplementation((offset: number = 300) => {
    return 1000 + offset >= 1200;
  });
  getScrollTop = jest.fn().mockReturnValue(0);
  scrollTop = jest.fn();
  saveScrollPosition = jest.fn();
  restoreScrollPosition = jest.fn();
  blockWindow = jest.fn();
}
