import { CanActivateFn } from '@angular/router';

export const headerGuard: CanActivateFn = (route, state) => {
  return true;
};
