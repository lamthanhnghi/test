import { Component } from '@angular/core';
import { IConfirmModal, ILoadingState, IMcBreadcrumb, McUploadFile } from '@shared/models';
import { CommonHelpers, RouteUtils } from '@shared/utils';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Store } from '@ngrx/store';
import { ConfirmModalComponent } from '@shared/components';
import { eConfirmModalTypes, eContentStatuses, ePageActions } from '@shared/enums';
import { startLoading, stopLoading } from '@shared/stores';
import { eProgramPolicyFormKeys, ICreateProgramPolicyPayload, IProgramPolicy } from '@shared/program-policy.model';
import { DATE_FORMAT } from '@shared/constants';
import { ProgramPolicyService } from '@shared/program-policy.service';

@Component({
  selector: 'app-program-policy-detail',
  templateUrl: './program-policy-detail.component.html',
  styleUrl: './program-policy-detail.component.scss',
})
export class ProgramPolicyDetailComponent {
  breadcrumbs: IMcBreadcrumb[] = [
    { title: 'Chính sách chương trình', link: ['/', RouteUtils.ProgramPoliciesPage.Base] },
    { title: 'Chi tiết', link: '#', disabled: true },
  ];
  avatars: McUploadFile[] = [];
  data: IProgramPolicy | null;
  readonly eProgramPolicyFormKeys = eProgramPolicyFormKeys;
  private sub: any;
  mode: ePageActions | any = ePageActions.Create;
  form: FormGroup = new FormGroup({
    [eProgramPolicyFormKeys.Title]: new FormControl(null, [Validators.required]),
    [eProgramPolicyFormKeys.Threshold]: new FormControl(null, [Validators.required]),
    [eProgramPolicyFormKeys.Content]: new FormControl(null, [Validators.required]),
    [eProgramPolicyFormKeys.DateApply]: new FormControl(null, [Validators.required]),
    [eProgramPolicyFormKeys.Version]: new FormControl(null, [Validators.required]),
    [eProgramPolicyFormKeys.ContentStatus]: new FormControl(null, []),
  });

  constructor(
    private apiService: ProgramPolicyService,
    private route: ActivatedRoute,
    private router: Router,
    private modal: NzModalService,
    private store$: Store<ILoadingState>,
  ) {
    const state = this.router.getCurrentNavigation()?.extras.state;
    this.data = this.route.snapshot.data['dataResolved'];
    if (this.data?.programPolicyID) {
      this.mode = state?.['isEdit'] ? ePageActions.Edit : ePageActions.View;
      this.form.patchValue(this.data);
    }
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
      if (this.data?.programPolicyID) {
        this.store$.dispatch(startLoading());
        this.apiService.delete({ programPolicyID: this.data.programPolicyID }).subscribe({
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
    const payload: ICreateProgramPolicyPayload = {
      ...this.form.value,
      notes: this.form.get(eProgramPolicyFormKeys.Title)?.value || '',
    };
    const api$ =
      this.mode === ePageActions.Create
        ? this.apiService.create(payload)
        : this.apiService.update({ ...payload, programPolicyID: this.data?.programPolicyID || '' });
    api$.subscribe({
      next: (res) => {
        this.store$.dispatch(stopLoading());
        console.log(res);
        if (res.result?.data?.programPolicyID) {
          if (this.mode === ePageActions.Create) {
            this.mode = ePageActions.View;
            this.router.navigate(['../', res.result.data.programPolicyID], { relativeTo: this.route }).then();
          } else {
            this.data = res.result?.data;
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
}
