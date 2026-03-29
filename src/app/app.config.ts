import {
  ApplicationConfig,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';

import { APP_BASE_HREF } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideTranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';
import { routes } from './app.routes';
import startupProvider from './startup.provider';

const baseHrefProvider = {
  provide: APP_BASE_HREF,
  // 这里的逻辑要与基座路由匹配
  useValue: window.__MODULE_IN_MFE__ ? '/chart/' : '/',
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withComponentInputBinding()),
    baseHrefProvider,
    provideTranslateService({
      defaultLanguage: 'zh-CN',
      loader: provideTranslateHttpLoader({ prefix: 'assets/i18n/', suffix: '.json' }),
    }),
    provideAppInitializer(startupProvider),
  ],
};
