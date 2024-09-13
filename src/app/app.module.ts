import { APP_INITIALIZER, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N, vi_VN } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import vi from '@angular/common/locales/vi';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateService } from '@ngx-translate/core';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { environment } from '@env/environment';
import { getAppConfigProvider } from '@core/app-config.token';
import {
  authInterceptorProvider,
  globalInterceptorProvider,
  unauthorizedInterceptorProvider,
} from '@core/interceptors';
import { LanguageFeatureModule } from '@shared/modules/language-feature.module';
import { JwtModule } from '@auth0/angular-jwt';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AUTH_FEATURE_KEY, AuthEffects, authReducer } from '@shared/auth';
import {
  LANGUAGE_FEATURE_KEY,
  LanguageEffects,
  languageReducer,
  LOADING_FEATURE_KEY,
  loadingReducer,
  TOAST_FEATURE_KEY,
  toastReducer,
  UPLOAD_PROGRESS_FEATURE_KEY,
  uploadProgressReducer,
} from '@shared/stores';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

registerLocaleData(vi);
registerLocaleData(en);

function appInitializerFactory(translate: TranslateService): () => Promise<any> {
  return () =>
    new Promise((resolve, reject) => {
      const subscription = translate.use('vi').subscribe({
        next: () => {
          subscription.unsubscribe(); // Unsubscribe to avoid memory leaks
          resolve(void 0);
        },
        error: (error) => {
          subscription.unsubscribe(); // Unsubscribe in case of an error
          reject(error);
        },
      });
    });
}

const rootReducers = {
  [AUTH_FEATURE_KEY]: authReducer,
  [LANGUAGE_FEATURE_KEY]: languageReducer,
  [TOAST_FEATURE_KEY]: toastReducer,
  [LOADING_FEATURE_KEY]: loadingReducer,
  [UPLOAD_PROGRESS_FEATURE_KEY]: uploadProgressReducer,
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    LanguageFeatureModule,
    BrowserAnimationsModule,
    NgxWebstorageModule.forRoot({ prefix: 'kos', separator: '-' }),
    JwtModule.forRoot({
      config: {
        tokenGetter: () => '',
      },
    }),
    StoreModule.forRoot(rootReducers),
    EffectsModule.forRoot([AuthEffects, LanguageEffects]),
    StoreDevtoolsModule.instrument(),
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializerFactory,
      deps: [TranslateService],
      multi: true,
    },
    getAppConfigProvider(environment),
    { provide: NZ_I18N, useValue: vi_VN },
    { provide: LOCALE_ID, useValue: 'vi-VN' },
    authInterceptorProvider,
    unauthorizedInterceptorProvider,
    globalInterceptorProvider,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
