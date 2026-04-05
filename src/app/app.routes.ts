import { Routes } from '@angular/router';
import { selectedKeyGuard } from '@core/guards/selectedKey.guard';
import { MdViewer } from '@pages/manual/md-viewer/md-viewer';

export const routes: Routes = [
  {
    path: 'manual',
    data: { menu: '笔记' },
    canActivateChild: [selectedKeyGuard],
    children: [
      {
        path: 'quick-start',
        data: { menu: '快速上手', fullPath: 'manual/quick-start', docPath: '1-quick-start' },
        component: MdViewer,
      },
      {
        path: 'introduction',
        data: { menu: '介绍', fullPath: 'manual/introduction' },
        children: [
          {
            path: 'what-is-g2',
            data: {
              menu: '什么是G2',
              fullPath: 'manual/introduction/what-is-g2',
              docPath: '2-introduction/2-1-what-is-g2',
            },
            component: MdViewer,
          },
          {
            path: 'use-in-vra',
            data: {
              menu: '在VRA中使用',
              fullPath: 'manual/introduction/use-in-vra',
              docPath: '2-introduction/2-2-use-in-vra',
            },
            component: MdViewer,
          },
          {
            path: 'experimental-spec-api',
            data: {
              menu: 'Spec和API',
              fullPath: 'manual/introduction/experimental-spec-api',
              docPath: '2-introduction/2-3-experimental-spec-api',
            },
            component: MdViewer,
          },
          {
            path: '',
            pathMatch: 'full',
            redirectTo: 'what-is-g2',
          },
        ],
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'quick-start',
      },
    ],
  },
  {
    path: 'demo',
    data: { menu: '示例' },
    canActivateChild: [selectedKeyGuard],
    children: [
      {
        path: 'interval',
        loadComponent: () =>
          import('@pages/demo/interval/interval').then(({ Interval }) => Interval),
        data: { menu: '柱状图', fullPath: 'demo/interval' },
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
    loadComponent: () => import('@pages/about/about').then(({ About }) => About),
    data: {
      menu: '关于',
    },
  },
  {
    path: '**',
    loadComponent: () => import('@pages/not-found/not-found').then(({ NotFound }) => NotFound),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'overview',
  },
];
