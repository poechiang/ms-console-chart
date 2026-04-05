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
import { MARKED_OPTIONS, MarkedRenderer, provideMarkdown } from 'ngx-markdown';
import { routes } from './app.routes';
import startupProvider from './startup.provider';

const baseHrefProvider = {
  provide: APP_BASE_HREF,
  // 这里的逻辑要与基座路由匹配
  useValue: window.__MODULE_IN_MFE__ ? '/chart/' : '/',
};

const markedOptionsFactory = () => {
  const renderer = new MarkedRenderer();
  const baseImagePath = `/docs/images`;
  renderer.image = (opt) => {
    const [alt, ...attributes] = opt.text.split('|');
    const fullPath = opt.href.startsWith('http') ? opt.href : `${baseImagePath}/${opt.href}`;
    return `<img src="${fullPath}" alt="${alt}" ${attributes.join(' ')} style="max-width:100%">`;
  };

  return { renderer };
};
export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withComponentInputBinding()),
    baseHrefProvider,
    provideTranslateService({
      fallbackLang: 'zh-CN',
      loader: provideTranslateHttpLoader({ prefix: 'assets/i18n/', suffix: '.json' }),
    }),
    provideMarkdown({
      markedOptions: {
        provide: MARKED_OPTIONS,
        useFactory: markedOptionsFactory,
      },
    }),
    provideAppInitializer(startupProvider),
  ],
};
