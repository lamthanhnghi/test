import { Inject, Injectable, Provider } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '@shared/auth.service';
import { APP_CONFIG } from '@core/app-config.token';
import { IAppConfig } from '@core/configs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    @Inject(APP_CONFIG) private appConfig: IAppConfig,
  ) {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (
      !req ||
      !req.url ||
      (/^http/.test(req.url) &&
        !(
          req.url.startsWith(this.appConfig.api_url || '~') ||
          req.url.startsWith(this.appConfig.connect_api_url || '~') ||
          req.url.startsWith(this.appConfig.api_url2 || '~')
        ))
    ) {
      return next.handle(req);
    }
    const token: string = this.authService.getToken();
    if (token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
          languageCode: 'vi', // TODO: refactor
        },
      });
    }

    return next.handle(req);
  }
}

export const authInterceptorProvider: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi: true,
  deps: [AuthService, APP_CONFIG],
};
