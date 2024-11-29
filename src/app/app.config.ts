import { ApplicationConfig, LOCALE_ID } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';

import { registerLocaleData } from '@angular/common';
import localEsMx from '@angular/common/locales/es-MX';
registerLocaleData(localEsMx, 'es-MX');

import { routes } from './app.routes';
import { routes as home } from './pages/home/home.routes';
import { routes as propertyList } from './pages/property-list/property-list.routes';
import { routes as propertyDetails } from './pages/property-details/property-details.routes';
import { routes as about } from './pages/about/about.routes';
import { routes as blogList } from './pages/blog-list/blog-list.routes';
import { routes as blogDetails } from './pages/blog-details/blog-details.routes';
import { routes as privacy } from './pages/privacy/privacy.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: LOCALE_ID, useValue: "es-MX" },
    provideAnimations(),
    provideHttpClient(),

    provideRouter(home, withComponentInputBinding()),
    provideRouter(propertyList, withComponentInputBinding()),
    provideRouter(propertyDetails, withComponentInputBinding()),
    provideRouter(about, withComponentInputBinding()),
    provideRouter(blogList, withComponentInputBinding()),
    provideRouter(blogDetails, withComponentInputBinding()),
    provideRouter(privacy, withComponentInputBinding()),

    provideRouter(routes, withComponentInputBinding()),
  ]
};
