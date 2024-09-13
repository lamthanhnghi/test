import { CanDeactivateFn } from '@angular/router';
import { Observable } from 'rxjs';
import { inject } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ConfirmModalComponent } from '@shared/components';

export const leaveGuard: CanDeactivateFn<any> = (component: any) => {
  const modal = inject(NzModalService);
  return new Observable((observer) => {
    if (component && component?.hasUnsavedChanges) {
      const modalRef = modal.create({
        nzClassName: 'mc-address-modal',
        nzContent: ConfirmModalComponent,
        nzData: {
          title: 'msg.confirm',
          message: 'msg.confirm_leave_page_in_case_of_unsaved_data',
          closeOnSubmit: true,
        },
      });

      modalRef.afterClose.subscribe((isOk) => {
        if (isOk) {
          observer.next(true);
          observer.complete();
        } else {
          observer.next(false);
          observer.complete();
        }
      });
    } else {
      observer.next(true);
      observer.complete();
    }
  });
};
