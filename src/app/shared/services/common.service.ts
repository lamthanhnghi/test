import { Injectable } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { TranslateService } from '@ngx-translate/core';
import { pipe, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CommonService {
  constructor(
    private notification: NzNotificationService,
    private translate: TranslateService,
  ) {}

  public handleSuccessApi<T>(title: string, message: string) {
    return pipe(
      tap((res: T) => {
        if (res && (res as any).statusCode === 200) {
          this.notification.success(this.translate.instant(title), this.translate.instant(message));
        }
      }),
    );
  }
}
