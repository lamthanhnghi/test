import { Component } from '@angular/core';
import { ProfileService } from '@shared/services';
import { ActivatedRoute, Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Store } from '@ngrx/store';
import { eDebtPolicyFormKeys, IAddUserModal, IAuthState, IPasswordModal, IProfile } from '@shared/models';
import { NgxImageCompressService } from 'ngx-image-compress';
import { TranslateService } from '@ngx-translate/core';
import { selectUser } from '@shared/auth';
import { eAccountStatus, eContentStatuses, ePageActions, eRoles } from '@shared/enums';
import { Subject } from 'rxjs';
import { AddUserModalComponent } from '@shared/add-user-modal/add-user-modal.component';
import { startLoading, stopLoading } from '@shared/stores';
import { CommonHelpers } from '@shared/utils';
import * as AuthActions from '@shared/auth/auth.actions';
import { PasswordModalComponent } from '@shared/password-modal/password-modal.component';

@Component({
  selector: 'app-profile-control-panel',
  templateUrl: './profile-control-panel.component.html',
  styleUrl: './profile-control-panel.component.scss',
})
export class ProfileControlPanelComponent {
  protected readonly eUserStatuses = eAccountStatus;
  protected readonly eContentStatuses = eContentStatuses;
  data?: IProfile;
  destroy$: Subject<void> = new Subject<void>();

  constructor(
    private apiService: ProfileService,
    private route: ActivatedRoute,
    private router: Router,
    private modal: NzModalService,
    private store$: Store<IAuthState>,
    private imageCompress: NgxImageCompressService,
    private translate: TranslateService,
  ) {
    this.store$.select(selectUser).subscribe((state) => {
      this.data = state;
    });
  }

  editPassword() {
    const modalRef2 = this.modal.create({
      nzClassName: 'modal-add modal-add-user',
      nzCentered: true,
      nzContent: PasswordModalComponent,
      nzData: {
        title: 'Thay đổi mật khẩu',
        closeOnSubmit: false,
      } as IPasswordModal,
    });

    modalRef2.getContentComponent().okEvent$.subscribe((payload) => {
      // console.log("isOk?", payload)
      if (!payload.isOk) {
        return;
      }

      this.store$.dispatch(startLoading());

      this.apiService
        .updateInfo({
          passwordOld: payload.oldPassword,
          passwordNew: payload.newPassword,
        })
        .subscribe({
          next: () => {
            modalRef2.close();

            this.store$.dispatch(AuthActions.getUser());
            this.store$.dispatch(stopLoading());
          },
          error: () => {
            this.store$.dispatch(stopLoading());
          },
        });
    });
  }

  edit() {
    const modalRef = this.modal.create({
      nzClassName: 'modal-add modal-add-user',
      nzCentered: true,
      nzContent: AddUserModalComponent,
      nzData: {
        title: 'Chỉnh sửa tài khoản',
        closeOnSubmit: false,
        data: this.data,
        isMyProfile: true,
      } as IAddUserModal,
    });

    modalRef.getContentComponent().okEvent$.subscribe((payload) => {
      console.log('isOk?', payload);
      if (!payload.isOk) {
        return;
      }

      this.store$.dispatch(startLoading());

      this.apiService
        .updateInfo({
          adminFullName: payload.name,
          adminCode: payload.code,
        })
        .subscribe({
          next: () => {
            modalRef.close();

            this.store$.dispatch(AuthActions.getUser());
            this.store$.dispatch(stopLoading());
          },
          error: () => {
            this.store$.dispatch(stopLoading());
          },
        });
    });
  }

  protected readonly ePageActions = ePageActions;
  protected readonly eDebtPolicyFormKeys = eDebtPolicyFormKeys;
  protected readonly eRoles = eRoles;
  protected readonly Object = Object;
  protected readonly CommonHelpers = CommonHelpers;
}
