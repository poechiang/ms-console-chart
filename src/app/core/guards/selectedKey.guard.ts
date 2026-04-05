import type { ActivatedRouteSnapshot, CanActivateFn } from '@angular/router';
import { useFrameAside, useFrameHeader } from '@core/signals';

const routeConfigPathFinder = (route: ActivatedRouteSnapshot): string[] => {
  const path = route.routeConfig?.path;
  if (!path) {
    return [];
  } else if (!route.parent) {
    return [path];
  } else {
    return [path, ...routeConfigPathFinder(route.parent)];
  }
};

export const selectedKeyGuard: CanActivateFn = (route, state) => {
  const header = useFrameHeader()!;
  const aside = useFrameAside()!;

  const [path1, ...path2] = routeConfigPathFinder(route).reverse();

  if (path1) {
    header.store.selectedMenuKey = path1;
  }
  console.log('path2', path2);
  if (path2) {
    aside.store.selectedMenuKeys = path2;
  }
  return true;
};
