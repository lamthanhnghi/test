import { Component } from '@angular/core';
import { eQnAFormKeys, IEnumOption, ILoadingState, IMcBreadcrumb, IQnA, IQnAPayload } from '@shared/models';
import { CommonHelpers, RouteUtils } from '@shared/utils';
import { eContentStatuses, ePageActions, eToastStatus, eUserTypes } from '@shared/enums';
import { ActivatedRoute, Router } from '@angular/router';
import { showToast, startLoading, stopLoading } from '@shared/stores';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Store } from '@ngrx/store';
import { QuestionAndAnswerService } from '@shared/services';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-question-and-answer-detail',
  templateUrl: './question-and-answer-detail.component.html',
  styleUrl: './question-and-answer-detail.component.scss',
})
export class QuestionAndAnswerDetailComponent {
  breadcrumbs: IMcBreadcrumb[] = [
    { title: 'menu.qa', link: ['/', RouteUtils.QuestionAndAnswer.Base] },
    { title: 'common.detail', link: '#', disabled: true },
  ];
  data?: IQnA;
  readonly eQnAFormKeys = eQnAFormKeys;
  private sub: any;
  mode: ePageActions | any = ePageActions.Create;
  readonly typeOptions: IEnumOption[] = [
    {
      label: 'seller',
      value: eUserTypes.Seller,
    },
    {
      label: 'customer',
      value: eUserTypes.User,
    },
  ];
  form: FormGroup = new FormGroup({
    [eQnAFormKeys.Question]: new FormControl(null, [Validators.required]),
    [eQnAFormKeys.Answer]: new FormControl(null, [Validators.required]),
    [eQnAFormKeys.ContentStatus]: new FormControl(null, []),
    [eQnAFormKeys.QnaType]: new FormControl(this.typeOptions?.[0]?.value, [Validators.required]),
  });

  constructor(
    private apiService: QuestionAndAnswerService,
    private route: ActivatedRoute,
    private router: Router,
    private modal: NzModalService,
    private store$: Store<ILoadingState>,
  ) {
    const state = this.router.getCurrentNavigation()?.extras.state;
    this.data = this.route.snapshot.data['dataResolved'];
    if (this.data?.qnAID) {
      this.mode = state?.['isEdit'] ? ePageActions.Edit : ePageActions.View;
      this.form.patchValue(this.data);
      if (this.data.qnAID) {
        this.breadcrumbs[1].title = this.data.question || this.breadcrumbs[1].title;
      }
    }
  }

  sendApproval(): void {}

  edit(): void {
    this.mode = ePageActions.Edit;
  }

  archive()  {
    this.store$.dispatch(
      showToast({
        status: eToastStatus.Warning,
        title: 'Thông báo',
        message: 'Tính năng đang cập nhật.',
      }),
    );
  }

  restore()  {
    this.store$.dispatch(
      showToast({
        status: eToastStatus.Warning,
        title: 'Thông báo',
        message: 'Tính năng đang cập nhật.',
      }),
    );
  }

  cancel(): void {
    this.mode = ePageActions.View;
  }

  delete(): void {
    // const modalRef = this.modal.create({
    //   nzClassName: 'modal-confirm',
    //   nzContent: ConfirmModalComponent,
    //   nzData: {
    //     type: eConfirmModalTypes.Confirm,
    //     title: 'msg.confirm',
    //     message: `msg.confirm_delete_data`,
    //   } as IConfirmModal,
    // });
    //
    // modalRef.componentInstance?.okEvent$.subscribe(() => {
    //   if (this.data?.productGroupID) {
    //     this.store$.dispatch(startLoading());
    //     this.apiService.delete({ productCategoryID: this.data.productGroupID }).subscribe({
    //       next: () => {
    //         this.store$.dispatch(stopLoading());
    //         modalRef.close();
    //         this.router.navigate(['../'], { relativeTo: this.route }).then();
    //       },
    //       error: (err) => {
    //         this.store$.dispatch(stopLoading());
    //         console.error(err);
    //       },
    //     });
    //   } else {
    //     this.router.navigate(['../'], { relativeTo: this.route }).then();
    //   }
    // });
  }

  submit(): void {
    if (this.form.invalid) {
      CommonHelpers.markFormDirty(this.form);
      return;
    }
    this.store$.dispatch(startLoading());
    const payload: IQnAPayload = {
      ...this.form.value,
      qnAID: this.data?.qnAID,
      contentStatus: undefined,
    };
    const api$ = this.mode === ePageActions.Create ? this.apiService.create(payload) : this.apiService.update(payload);
    api$.subscribe({
      next: (res) => {
        this.store$.dispatch(stopLoading());
        if (res.result.data.qnAID) {
          if (this.mode === ePageActions.Create) {
            this.router.navigate(['../', res.result.data.qnAID], { relativeTo: this.route }).then();
          } else {
            if (res.result?.data) {
              this.data = res.result.data;
              this.form.patchValue({ ...this.data });
              this.mode = ePageActions.View;
            }
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
}
