import { Component, OnDestroy } from '@angular/core';
import { IConfirmModal, ILoadingState, IMcBreadcrumb, McUploadFile } from '@shared/models';
import { CommonHelpers, RouteUtils } from '@shared/utils';
import { Subject, takeUntil } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Store } from '@ngrx/store';
import { ConfirmModalComponent } from '@shared/components';
import { eConfirmModalTypes, eContentStatuses, ePageActions } from '@shared/enums';
import { startLoading, stopLoading } from '@shared/stores';
import { DATE_FORMAT } from '@shared/constants';
import {
  eOrganizationRegistrationPolicyFormKeys,
  IOrganizationRegistrationPolicyItem,
  IOrganizationRegistrationPolicyPayload,
} from '@shared/organization-registration-policy.model';
import { OrganizationRegistrationPolicyService } from '@shared/organization-registration-policy.service';

@Component({
  selector: 'app-organization-registration-policy-detail',
  templateUrl: './organization-registration-policy-detail.component.html',
  styleUrl: './organization-registration-policy-detail.component.scss',
})
export class OrganizationRegistrationPolicyDetailComponent implements OnDestroy {
  breadcrumbs: IMcBreadcrumb[] = [
    { title: 'Chính sách đăng ký tổ chức', link: ['/', RouteUtils.OrganizationRegistrationPoliciesPage.Base] },
    { title: 'Chi tiết', link: '#', disabled: true },
  ];
  avatars: McUploadFile[] = [];
  data?: IOrganizationRegistrationPolicyItem;
  readonly FormKeys = eOrganizationRegistrationPolicyFormKeys;
  mode: ePageActions | any = ePageActions.Create;
  destroy$: Subject<void> = new Subject<void>();
  form: FormGroup = new FormGroup({
    [eOrganizationRegistrationPolicyFormKeys.Title]: new FormControl(null, [Validators.required]),
    [eOrganizationRegistrationPolicyFormKeys.Content]: new FormControl(null, [Validators.required]),
    [eOrganizationRegistrationPolicyFormKeys.Notes]: new FormControl(null, [Validators.required]),
    [eOrganizationRegistrationPolicyFormKeys.ApplyDate]: new FormControl(null, [Validators.required]),
    [eOrganizationRegistrationPolicyFormKeys.Version]: new FormControl(null, [Validators.required]),
    [eOrganizationRegistrationPolicyFormKeys.ContentStatus]: new FormControl(null, []),
  });

  constructor(
    private apiService: OrganizationRegistrationPolicyService,
    private route: ActivatedRoute,
    private router: Router,
    private modal: NzModalService,
    private store$: Store<ILoadingState>,
  ) {
    const state = this.router.getCurrentNavigation()?.extras.state;
    this.route.data.pipe(takeUntil(this.destroy$)).subscribe((data) => {
      this.data = data['dataResolved'];
      if (this.data?.organizationRegistrationPolicyID) {
        this.mode = state?.['isEdit'] ? ePageActions.Edit : ePageActions.View;
        this.form.patchValue(this.data);
      }
    });
  }

  sendApproval(): void {}

  edit(): void {
    this.mode = ePageActions.Edit;
  }

  cancel(): void {
    this.mode = ePageActions.View;
  }

  delete(): void {
    const modalRef = this.modal.create({
      nzClassName: 'modal-confirm',
      nzContent: ConfirmModalComponent,
      nzData: {
        type: eConfirmModalTypes.Confirm,
        title: 'msg.confirm',
        message: `msg.confirm_delete_data`,
      } as IConfirmModal,
    });

    modalRef.componentInstance?.okEvent$.subscribe(() => {
      if (this.data?.organizationRegistrationPolicyID) {
        this.store$.dispatch(startLoading());
        this.apiService.delete(this.data.organizationRegistrationPolicyID).subscribe({
          next: () => {
            this.store$.dispatch(stopLoading());
            modalRef.close();
            this.router.navigate(['../'], { relativeTo: this.route }).then();
          },
          error: (err) => {
            this.store$.dispatch(stopLoading());
            console.error(err);
          },
        });
      } else {
        this.router.navigate(['../'], { relativeTo: this.route }).then();
      }
    });
  }

  submit(): void {
    if (this.form.invalid) {
      CommonHelpers.markFormDirty(this.form);
      return;
    }
    this.store$.dispatch(startLoading());
    const payload: IOrganizationRegistrationPolicyPayload = {
      ...this.form.value,
    };
    const api$ =
      this.mode === ePageActions.Create
        ? this.apiService.create(payload)
        : this.apiService.update({
            ...payload,
            organizationRegistrationPolicyID: this.data?.organizationRegistrationPolicyID || '',
          });
    api$.subscribe({
      next: (res) => {
        this.store$.dispatch(stopLoading());
        if (res.result.data.organizationRegistrationPolicyID) {
          if (this.mode === ePageActions.Create) {
            this.mode = ePageActions.View;
            this.router
              .navigate(['../', res.result.data.organizationRegistrationPolicyID], {
                relativeTo: this.route,
              })
              .then();
          } else {
            this.data = res.result.data;
            this.form.patchValue({ ...this.data });
            this.mode = ePageActions.View;
          }
        }
      },
      error: (err) => {
        console.error(err);
        this.store$.dispatch(stopLoading());
      },
    });
  }

  protected readonly eContentStatuses = eContentStatuses;
  protected readonly ePageActions = ePageActions;
  protected readonly DATE_FORMAT = DATE_FORMAT;

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
