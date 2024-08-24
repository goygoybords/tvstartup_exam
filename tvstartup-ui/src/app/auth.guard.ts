import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { UserService } from './user.service';

export const authGuard: CanActivateFn = (route, state) =>
{
  const userService = inject(UserService);
  const router = inject(Router);

  if (userService.isLoggedIn())
      return true;
  else
  {
      router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
      return false;
  }
};