import { InjectionToken, ValueProvider } from '@angular/core';
import { IAppConfig } from './app.config';

export const APP_CONFIG = new InjectionToken<IAppConfig>('connect.config');

export const getAppConfigProvider = (value: IAppConfig): ValueProvider => ({
  provide: APP_CONFIG,
  useValue: value,
});
