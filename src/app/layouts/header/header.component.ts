import { Component, Inject, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { en_US, NzI18nService, vi_VN } from 'ng-zorro-antd/i18n';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IProfile } from '@shared/profile.models';
import { isAuthenticated, selectUser } from '@shared/stores';
import { RouteUtils } from '@shared/utils';
import { IAuthState } from '@shared/models';
import * as AuthActions from '@shared/stores/auth';
import { APP_CONFIG, IAppConfig } from '@core/configs';
import { eRoles } from '@shared/enums';
import { AuthService } from '@shared/services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  readonly RouteUtils = RouteUtils;
  currentLanguage = 'en';
  user$: Observable<IProfile | undefined> = new Observable<undefined>();
  isLoggedIn$ = new Observable<boolean>();
  role?: eRoles;

  constructor(
    private translateService: TranslateService,
    private i18n: NzI18nService,
    private store$: Store<IAuthState>,
    @Inject(APP_CONFIG) public appConfig: IAppConfig,
    private AuthService: AuthService,
  ) {
    this.currentLanguage = this.translateService.getDefaultLang();
    this.changeLanguage(this.currentLanguage);
  }

  ngOnInit(): void {
    this.user$ = this.store$.select(selectUser);
    this.isLoggedIn$ = this.store$.select(isAuthenticated);
    this.role = this.AuthService.getRole();
  }

  changeLanguage(lang: string) {
    this.translateService.use(lang);
    switch (lang) {
      case 'en':
        this.i18n.setLocale(en_US);
        break;
      case 'vi':
        this.i18n.setLocale(vi_VN);
        break;
      default:
        this.i18n.setLocale(vi_VN);
    }
    this.currentLanguage = lang;
  }

  logout(): void {
    this.store$.dispatch(AuthActions.logout({ isCallApi: true }));
  }
}
