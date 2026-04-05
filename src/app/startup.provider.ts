import { inject } from '@angular/core';
import { Router, Routes } from '@angular/router';
import { I18nService } from '@core/services/i18n';
import { AsideMenuItem, HeaderMenuItem } from '@shared/types';
import { routes } from './app.routes';
import { useFrameAside, useFrameEvent, useFrameHeader } from './core/signals';

const updateFrameHeader = (router: Router, i18n: I18nService) => {
  const header = useFrameHeader();
  if (header) {
    header.store.title = 'Console Chart';
    const onClick = (item: HeaderMenuItem) => {
      router.navigateByUrl(item.path!);
    };
    header.store.menuItems = routes
      .filter((r) => r.path && r.data?.['menu'])
      .map((r) => ({
        key: r.path!,
        path: r.path!,
        label: i18n.decode(r.data?.['menu']),
        onClick,
      }));
  }
};

const updateFrameAside = (router: Router, i18n: I18nService) => {
  const aside = useFrameAside();
  const header = useFrameHeader();
  if (aside) {
    const current = routes.find((r) => r.path === header?.store.selectedMenuKey);
    if (!current) {
      aside.store.menuItems = [];
      return;
    }

    aside.store.menuItems = buildAsideMenuList(current.children ?? [], i18n, router);
  }
};

const buildAsideMenuList = (routes: Routes, i18n: I18nService, router: Router): AsideMenuItem[] =>
  routes
    .filter((r) => r.path && r.data?.['menu'])
    .map((r) => ({
      key: r.path!,
      label: i18n.decode(r.data?.['menu']),
      path: r.data?.['fullPath'],
      children: r.children ? buildAsideMenuList(r.children, i18n, router) : undefined,
      onClick: () => router.navigateByUrl(r.data?.['fullPath']!),
    })) ?? [];
const locadCcs = (key: string) => {
  const link = document.querySelector(`link[data-theme="${key}"]`) as HTMLLinkElement;
  if (link) {
    link.disabled = false;
  } else {
    const newLink = document.createElement('link');
    newLink.rel = 'stylesheet';
    newLink.href = `/${key}.css`;
    newLink.setAttribute('data-theme', key);
    newLink.onload = () => {
      document.querySelectorAll('link[data-theme]').forEach((el) => {
        if ((el as HTMLLinkElement).getAttribute('data-theme') !== key) {
          (el as HTMLLinkElement).disabled = true;
        }
      });
    };
    document.head.appendChild(newLink);
  }
};

export default async () => {
  const router = inject(Router);
  const i18n = inject(I18nService);

  const events = useFrameEvent();
  const header = useFrameHeader();

  locadCcs(header?.store?.theme ?? 'light');
  events?.on('theme:change', (key, coloring) => {
    locadCcs(key);
  });

  await i18n.init(header?.store.locale);
  updateFrameHeader(router, i18n);
  updateFrameAside(router, i18n);
  events?.on('menu:change', (key, loc) => {
    if (loc === 'header') {
      updateFrameAside(router, i18n);
    }
  });

  events?.on('locale:change', (key) => {
    i18n.use(key);
    updateFrameHeader(router, i18n);
    updateFrameAside(router, i18n);
  });
};
