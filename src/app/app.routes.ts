import { CanActivateFn, Route } from '@angular/router';
import { useFrameAside, useFrameHeader } from '@core/signals';
import { Loose } from '@shared/types';

const xxGuard: CanActivateFn = (route, state) => {
  const header = useFrameHeader()!;
  const aside = useFrameAside()!;
  if (route.routeConfig) {
    aside.store.selectedMenuKey = (route.routeConfig as any).key;
  }
  if (route.parent?.routeConfig) {
    header.store.selectedMenuKey = (route.parent.routeConfig as any).key;
  }
  return true;
};

export interface ExtendRoute extends Omit<Route, 'children'> {
  key?: string;
  meta?: Loose;
  children?: ExtendRoute[];
}
export const routes: ExtendRoute[] = [
  {
    path: 'documents',
    key: 'Document',
    meta: { menuLabel: '笔记' },
    canActivateChild: [xxGuard],
    children: [
      {
        path: 'overview',
        key: 'Overview',
        loadComponent: () =>
          import('@pages/documents/overview/overview').then(({ Overview }) => Overview),
        meta: { menuLabel: '总览' },
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'overview',
      },
    ],
  },
  {
    path: 'demo',
    key: 'Demo',
    meta: { menuLabel: '示例' },
    canActivateChild: [xxGuard],
    children: [
      {
        path: 'interval',
        key: 'Interval',
        loadComponent: () =>
          import('@pages/demo/interval/interval').then(({ Interval }) => Interval),
        meta: { menuLabel: '柱状图' },
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'interval',
      },
    ],
  },
  {
    path: 'about',
    key: 'About',
    loadComponent: () => import('@pages/about/about').then(({ About }) => About),
    meta: {
      menuLabel: '关于',
    },
  },
  {
    path: '**',
    key: 'NotFound',
    loadComponent: () => import('@pages/not-found/not-found').then(({ NotFound }) => NotFound),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'overview',
  },
];
