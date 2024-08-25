import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { UserService } from './user.service';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export const userAccountInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> =>
{
  const userService = inject(UserService);
  const router = inject(Router);
  const token = userService.getToken();

  if (token)
  {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
  }

  return next(req).pipe
  (
      catchError((error: HttpErrorResponse) =>
      {
        if (error.status === 401)
        {
          console.log("User Interceptor called");
          userService.logout();
          router.navigate(['/login']);
          location.reload();
        }
        return throwError(() => error);
      })
  );
};
