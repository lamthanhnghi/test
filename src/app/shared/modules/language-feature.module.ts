import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

function AppTranslateLoader(http: HttpClient) {
  return new I18NLoader(http, './assets/i18n');
}

class LANGUAGE_DATA {
  public data: any = {};
  merge(obj: any, next: any) {
    if (obj && next) {
      Object.keys(next).map((key) => {
        if (typeof next[key] == 'object') {
          if (typeof obj[key] == 'undefined') {
            obj[key] = {};
          }
          this.merge(obj[key], next[key]);
        } else {
          obj[key] = next[key];
        }
      });
    }
  }

  setTranslation(lang: string, data: any) {
    if (typeof this.data[lang] == 'undefined') {
      this.data[lang] = {};
    }
    if (data) {
      this.merge(this.data[lang], data);
    }
  }
  getTranslation(lang: string) {
    return this.data[lang];
  }
}

const LA = new LANGUAGE_DATA();

class I18NLoader implements TranslateLoader {
  constructor(
    private http: HttpClient,
    private prefix?: string,
    private group?: string,
  ) {}

  async fetch(lang: any) {
    return await this.http.get<any>(`${this.prefix || './assets/i18n'}/${lang}.json`).toPromise();
  }

  public getTranslation(lang: any): Observable<any> {
    const subject: Subject<any> = new Subject();
    const observe = subject.asObservable();
    const group = this.group;
    document.body.classList.add('i18n-loading');
    this.fetch(lang).then((data: any) => {
      // I18nLoaderSubject.next({lang:lang,data:{...data}});
      if (group) {
        LA.setTranslation(lang, this.createObject(group, data));
      } else {
        LA.setTranslation(lang, data);
      }
      subject.next(LA.getTranslation(lang));
      document.body.classList.remove('i18n-loading');
    });
    return observe;
  }

  createObject(key: string, value: any) {
    const obj: any = {};
    const parts: any = key.split('.');
    if (parts.length == 1) {
      obj[parts[0]] = value;
    } else if (parts.length > 1) {
      const remainingParts = parts.slice(1, parts.length).join('.');
      obj[parts[0]] = this.createObject(remainingParts, value);
    }
    return obj;
  }
}

@NgModule({
  imports: [
    CommonModule,
    TranslateModule.forRoot({
      defaultLanguage: 'vi',
      loader: {
        provide: TranslateLoader,
        useFactory: AppTranslateLoader,
        deps: [HttpClient],
      },
    }),
  ],
  exports: [TranslateModule],
})
export class LanguageFeatureModule {}
