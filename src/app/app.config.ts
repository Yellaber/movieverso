import { ApplicationConfig, inject, provideAppInitializer, provideZoneChangeDetection } from '@angular/core';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { IMAGE_LOADER, ImageLoaderConfig } from '@angular/common';
import { provideTranslateService } from "@ngx-translate/core";
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';
import { routes } from './app-routes';
import { UserGeolocationService } from '@services';
import { environment } from '@environments/environment';

export const tmdbImageLoader = (config: ImageLoaderConfig) => {
  return config.src.startsWith('/images/')? config.src: `${environment.imageUrl}w${config.width}${config.src}`;
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(withFetch()),
    provideClientHydration(withEventReplay()),
    provideRouter(routes),
    {
      provide: IMAGE_LOADER,
      useValue: tmdbImageLoader,
    },
    provideAppInitializer(() => {
      const userGeolocationService = inject(UserGeolocationService);
      return userGeolocationService.loadUserLocation();
    }),
    provideTranslateService({
      loader: provideTranslateHttpLoader({
        prefix: './i18n/',
        suffix: '.json'
      }),
      fallbackLang: 'en',
      lang: 'es'
    }),
  ]
};
