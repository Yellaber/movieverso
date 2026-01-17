import { Injectable, Pipe, PipeTransform } from '@angular/core';
import { of } from 'rxjs';

@Pipe({ name: 'translate' })
export class MockTranslatePipe implements PipeTransform {
  transform(value: string): string {
    return value;
  };
}

@Injectable()
export class MockTranslateService {
  addLangs = jest.fn();
  setFallbackLang = jest.fn();
  use = jest.fn().mockReturnValue(of('es'));
  getLangs = jest.fn().mockReturnValue(['es', 'en']);
  get = jest.fn().mockImplementation((key: string) => of(`translated:${key}`));
  instant = jest.fn((key: string) => `translated:${key}`);
  onLangChange = of({ lang: 'en' });
  onTranslationChange = of();
  onDefaultLangChange = of();
}
