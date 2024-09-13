import { Component } from '@angular/core';
import { eAccountStatus, eConfirmModalTypes, eContentStatuses, ePageActions, eRoles } from '@shared/enums';
import { AddUserModalComponent } from '@shared/add-user-modal/add-user-modal.component';
import { eDebtPolicyFormKeys, IAddUserModal, IAuthState, IConfirmModal, ILoadingState } from '@shared/models';
import { selectUser, stopLoading } from '@shared/stores';
import { Subject, takeUntil } from 'rxjs';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '@shared/users.service';
import { IUser } from '@shared/users.model';
import { CommonHelpers } from '@shared/utils';
import { ConfirmModalComponent } from '@shared/components';

@Component({
  selector: 'app-user-detail-control-panel',
  templateUrl: './user-detail-control-panel.component.html',
  styleUrl: './user-detail-control-panel.component.scss',
})
export class UserDetailControlPanelComponent {
  // data: UserData = USERS_MOCK_DATA[0]

  protected readonly eUserStatuses = eAccountStatus;
  protected readonly eContentStatuses = eContentStatuses;
  data?: IUser;
  destroy$: Subject<void> = new Subject<void>();
  isSuperAdmin$: boolean = false;

  constructor(
    private apiService: UsersService,
    private route: ActivatedRoute,
    private router: Router,
    private modal: NzModalService,
    private store$: Store<ILoadingState & IAuthState>,
  ) {
    this.route.data.pipe(takeUntil(this.destroy$)).subscribe((data) => {
      this.data = data['dataResolved'];
    });
    this.store$.select(selectUser).subscribe((state) => {
      this.isSuperAdmin$ = state?.adminRole == eRoles.SuperAdmin;
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
      } as IAddUserModal,
    });

    modalRef.getContentComponent().okEvent$.subscribe((payload) => {
      console.log('isOk?', payload);
      if (!payload.isOk) {
        return;
      }

      if (!this.data) return;

      this.apiService
        .updateAdmin({
          adminID: this.data.adminID,
          adminFullName: payload.name,
          adminCode: payload.code,
          role: payload.role,
        })
        .subscribe({
          next: (res) => {
            if (res?.result?.data) {
              modalRef.close();
            }
            this.store$.dispatch(stopLoading());
          },
          error: () => {
            this.store$.dispatch(stopLoading());
          },
        });
    });
  }

  updateStatus(status: eAccountStatus) {
    if (!this.data) return;

    const modalRef = this.modal.create({
      nzClassName: 'modal-confirm',
      nzContent: ConfirmModalComponent,
      nzData: {
        type: eConfirmModalTypes.Confirm,
        title: 'msg.confirm',
        message: `Bạn thật sự muốn thực hiện hành động này?`,
      } as IConfirmModal,
    });

    modalRef.componentInstance?.okEvent$.subscribe(() => {
      this.apiService
        .updateAdminStatus({
          adminID: this.data!.adminID,
          accountStatus: status,
        })
        .subscribe({
          next: (res) => {
            this.store$.dispatch(stopLoading());
            this.router.navigate(['../', "control-panel" ], { relativeTo: this.route, queryParams: {
                v: Date.now()
              }}).then();
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
  protected readonly eAccountStatus = eAccountStatus;
}
