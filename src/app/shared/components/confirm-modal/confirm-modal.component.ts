import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';
import { Subject } from 'rxjs';
import { IConfirmModal } from '@shared/models';
import { eConfirmModalTypes } from '@shared/enums';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class ConfirmModalComponent {
  okEvent$ = new Subject<boolean>();
  constructor(
    @Inject(NZ_MODAL_DATA) public data: IConfirmModal,
    public modalRef: NzModalRef,
  ) {
    if (!data.title) {
      data.title = 'msg.confirm';
    }

    if (!data.message) {
      data.message = 'msg.confirm_action';
    }

    if (!data.confirmText) {
      data.confirmText = 'msg.confirm';
    }

    if (!data.cancelText) {
      data.cancelText = 'msg.cancel';
    }

    if (!data.type) {
      data.type = eConfirmModalTypes.Confirm;
    }

    if (data.hideConfirm === undefined) {
      data.hideConfirm = false;
    }

    if (data.hideCancel === undefined) {
      data.hideCancel = false;
    }
  }

  confirm(): void {
    if (this.data.closeOnSubmit) {
      this.okEvent$.next(true);
      this.modalRef.close(true);
    } else {
      this.okEvent$.next(true);
    }
  }

  protected readonly eConfirmModalTypes = eConfirmModalTypes;
}
