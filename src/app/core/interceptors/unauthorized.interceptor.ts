import {
  HTTP_INTERCEPTORS,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable, Provider } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { logout } from '@shared/auth';

@Injectable()
export class UnauthorizedInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private store$: Store,
  ) {}

  intercept(
    req: HttpRequest<Record<string, string>>,
    next: HttpHandler,
  ): Observable<HttpEvent<Record<string, string>>> {
    return next.handle(req).pipe(
      catchError((err: HttpResponse<Record<string, string>>) => {
        if (err.status === 401) {
          // show modal error
          console.log('Unauthorized');
          this.store$.dispatch(logout({ isCallApi: false }));
        }
        return throwError(() => err);
      }),
    );
  }
}

export const unauthorizedInterceptorProvider: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: UnauthorizedInterceptor,
  multi: true,
  deps: [Router, Store],
};
