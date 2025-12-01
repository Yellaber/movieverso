import { PaginationUtils } from './pagination-utils';

describe('PaginationUtils', () => {
  let paginationUtils: PaginationUtils;

  beforeEach(() => {
    paginationUtils = new PaginationUtils();
  })

  it('Should return the current page.', () => {
    expect(paginationUtils).toBeTruthy();
    expect(paginationUtils.getPage()).toBe(1);
  })

  it('Should get the next page.', () => {
    paginationUtils.next();
    expect(paginationUtils.getPage()).toBe(2);
  })

  it('Should reset the page to 1.', () => {
    paginationUtils.next();
    expect(paginationUtils.getPage()).toBe(2);
    paginationUtils.reset();
    expect(paginationUtils.getPage()).toBe(1);
  })
})
