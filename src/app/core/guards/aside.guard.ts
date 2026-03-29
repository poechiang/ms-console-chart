import { CanActivateFn } from '@angular/router';

export const asideGuard: CanActivateFn = (route, state) => {
  return true;
};
