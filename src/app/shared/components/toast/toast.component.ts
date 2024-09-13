import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { filter, Subject, takeUntil } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { IToastState } from '@shared/models';
import { selectToast, showToastSuccess } from '@shared/stores';
import { eToastStatus } from '@shared/enums';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ToastComponent implements OnInit, OnDestroy {
  unsubscribe$ = new Subject<void>();
  isMobile = false;

  constructor(
    private store: Store<IToastState>,
    private notification: NzNotificationService,
    private translate: TranslateService,
    private message: NzMessageService,
  ) {
    // this.nzConfigService.set('message', { nzTop: '85%', nzDirection: 'rtl' });
    this.isMobile = navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i) !== null;
  }

  ngOnInit(): void {
    this.store
      .select(selectToast)
      .pipe(
        takeUntil(this.unsubscribe$),
        filter((t) => t.status !== '' && t.message !== ''),
      )
      .subscribe((toast) => {
        const title = this.translate.instant(toast.title || 'msg.notification');
        let message = '';
        if (toast.message) {
          message = this.translate.instant(toast.message);
        } else {
          const action = toast.action ? this.translate.instant(toast.action) : '';
          const object = toast.object ? this.translate.instant(toast.object) : '';
          const status = toast.status ? this.translate.instant(toast.status) : '';
          message = `${action} ${this.translate.instant(object)} ${status}`;
        }
        switch (toast.status) {
          case eToastStatus.Success:
            if (this.isMobile) {
              this.message.success(message);
            } else {
              this.notification.success(title, message);
            }
            break;
          case eToastStatus.Error:
            if (this.isMobile) {
              this.message.error(message);
            } else {
              this.notification.error(title, message);
            }
            break;
          case eToastStatus.Warning:
            if (this.isMobile) {
              this.message.warning(message);
            } else {
              this.notification.warning(title, message);
            }
            break;
        }
        this.store.dispatch(showToastSuccess());
      });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
