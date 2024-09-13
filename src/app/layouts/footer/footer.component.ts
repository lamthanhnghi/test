import { Component, Inject } from '@angular/core';
import { APP_CONFIG, IAppConfig } from '@core/configs';
import { TranslateService } from '@ngx-translate/core';
import { RouteUtils } from '@shared/utils';
import { NzI18nService, en_US, vi_VN } from 'ng-zorro-antd/i18n';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  readonly RouteUtils = RouteUtils;
  currentLanguage = 'en';
  constructor(
    private translateService: TranslateService,
    private i18n: NzI18nService,
    @Inject(APP_CONFIG) public appConfig: IAppConfig,
  ) {
    this.currentLanguage = this.translateService.getDefaultLang();
    this.changeLanguage(this.currentLanguage);
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
}
