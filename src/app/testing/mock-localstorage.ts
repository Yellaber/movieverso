import { mockGeolocation } from './mock-geolocation';

export const mockLocalStorage = {
  getItem: jest.fn().mockReturnValue(JSON.stringify(mockGeolocation)),
  setItem: jest.fn().mockImplementation((key, value) => {
    localStorage.setItem(key, value);
  })
};
