import { SafeResourceUrl } from '@angular/platform-browser';

export class MockDomSanitizer {
  sanitize = jest.fn();
  bypassSecurityTrustResourceUrl = jest.fn().mockImplementation((url: string): SafeResourceUrl => {
    return {
      changingThisBreaksApplicationSecurity: url
    } as SafeResourceUrl;
  });
}
