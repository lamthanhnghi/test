import { Component, Input } from '@angular/core';
import { ACCOUNT_MENU_ITEMS } from '@shared/constants';
import { IAuthState, IMcBreadcrumb } from '@shared/models';
import * as AuthActions from '@shared/stores/auth';
import { Store } from '@ngrx/store';
import { eMenuClickEvents } from '@shared/enums';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ConfirmModalComponent } from '@shared/components';

@Component({
  selector: 'app-profile-master-layout',
  templateUrl: './profile-master-layout.component.html',
  styleUrl: './profile-master-layout.component.scss',
})
export class ProfileMasterLayoutComponent {
  menuItems = ACCOUNT_MENU_ITEMS;
  @Input() breadcrumbs: IMcBreadcrumb[] = [{ title: 'Thông tin chi tiết', link: '/', disabled: false }];

  constructor(
    private store$: Store<IAuthState>,
    private modalService: NzModalService,
  ) {}

  onClickEvent(event: eMenuClickEvents) {
    if (event === eMenuClickEvents.SignOut) {
      this.signOut();
    }
  }

  signOut() {
    const modalRef = this.modalService.create({
      nzClassName: 'modal-confirm',
      nzContent: ConfirmModalComponent,
      nzData: {
        title: 'msg.confirm',
        message: 'msg.confirm_logout',
        closeOnSubmit: true,
      },
    });
    modalRef.afterClose.subscribe((result) => {
      if (result) {
        this.store$.dispatch(AuthActions.logout({ isCallApi: true }));
      }
    });
  }
}
