import { Component } from '@angular/core';
import { IConfirmModal, ILoadingState, IMcBreadcrumb, ITextFeedbackModal } from '@shared/models';
import { eBtnActions, eConfirmModalTypes, eContentStatuses, ePageActions, eRoles, ERROR_CODES } from '@shared/enums';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectUser, startLoading, stopLoading } from '@shared/stores';
import { SharedModule } from '@shared/shared.module';
import { ItemDetailMasterLayoutModule } from '@shared/item-detail-master-layout/item-detail-master-layout.module';
import { ApprovalBtnGroupComponent } from '@shared/approval-btn-group/approval-btn-group.component';
import { eBadWordFormKeys, IBadWord } from '@shared/bad-word.model';
import { BadWordsService } from '@shared/bad-words.service';
import { CommonHelpers } from '@shared/utils';
import { BaseDetailModel } from '@shared/base-detail.model';
import { ConfirmModalComponent } from '@shared/components';
import { NzModalService } from 'ng-zorro-antd/modal';
import { take } from 'rxjs';
import { TextFeedbackModalComponent } from '@shared/text-feedback-modal/text-feedback-modal.component';

@Component({
  selector: 'app-general-setting-detail',
  templateUrl: './community-standards-detail.component.html',
  styleUrl: './community-standards-detail.component.scss',
  standalone: true,
  imports: [SharedModule, ItemDetailMasterLayoutModule, ApprovalBtnGroupComponent],
  providers: [BadWordsService],
})
export class CommunityStandardsDetailComponent extends BaseDetailModel {
  breadcrumbs: IMcBreadcrumb[] = [
    { title: 'menu.community_standards.base', link: ['../'] },
    { title: 'common.detail', disabled: true, link: [] },
  ];
  readonly eBadWordFormKeys = eBadWordFormKeys;
  existWords: string[] = [];
  form: FormGroup = new FormGroup({
    [eBadWordFormKeys.word]: new FormControl('', [
      Validators.required,
      this.validateExistWord(),
      Validators.maxLength(50),
    ]),
  });
  mode: ePageActions | any = ePageActions.Create;
  role?: eRoles;
  data?: IBadWord;
  protected readonly eContentStatuses = eContentStatuses;
  protected readonly ePageActions = ePageActions;
  protected readonly eRoles = eRoles;

  constructor(
    private apiService: BadWordsService,
    private route: ActivatedRoute,
    private router: Router,
    private store$: Store<ILoadingState>,
    private modal: NzModalService,
  ) {
    super({ router });
    this.store$
      .select(selectUser)
      .pipe(take(1))
      .subscribe((user) => {
        this.role = user?.adminRole;
      });
    route.params.pipe().subscribe(() => {
      const state = this.router.getCurrentNavigation()?.extras.state;
      this.data = this.route.snapshot.data['dataResolved'];
      if (this.data?.badWordID) {
        this.mode = state?.['isEdit'] ? ePageActions.Edit : ePageActions.View;
        this.form.patchValue(this.data);
      }
      this.updateBreadcrumb();
    });
  }

  updateBreadcrumb(): void {
    if (this.mode === ePageActions.Create) {
      this.breadcrumbs[1].title = 'Thêm mới';
    } else if (this.mode === ePageActions.Edit) {
      this.breadcrumbs[1].title = 'Sửa';
    } else {
      this.breadcrumbs[1].title = 'Chi tiết';
    }
  }

  onBtnClicked(action: eBtnActions): void {
    switch (action) {
      case eBtnActions.Save:
        this.submit();
        break;
      case eBtnActions.Cancel:
        if (this.mode === ePageActions.Create) {
          this.router.navigate(['../'], { relativeTo: this.route, replaceUrl: true }).then();
        } else {
          this.mode = ePageActions.View;
          this.form.patchValue({ [eBadWordFormKeys.word]: this?.data?.word });
          this.updateBreadcrumb();
        }
        break;
      case eBtnActions.Edit:
        this.mode = ePageActions.Edit;
        this.updateBreadcrumb();
        break;
      case eBtnActions.SendApproval:
        this.sendApproval();
        break;
      case eBtnActions.Delete:
        this.delete();
        break;
      case eBtnActions.Reviewing:
        this.reviewing(this.data!);
        break;
      case eBtnActions.Approve:
        this.approve();
        break;
      case eBtnActions.Reject:
        this.reject();
        break;
      default:
        break;
    }
  }

  submit(): void {
    if (this.form.invalid) {
      CommonHelpers.markFormDirty(this.form);
      Object.keys(this.form.controls).forEach((key) => {
        if (this.form.controls[key].invalid) {
          console.log(key, this.form.controls[key].errors);
        }
      });
      return;
    }
    this.store$.dispatch(startLoading());
    const payload = {
      ...this.form.value,
      badWordID: this.data?.badWordID,
    };
    const api$ = this.mode === ePageActions.Create ? this.apiService.create(payload) : this.apiService.update(payload);
    api$.subscribe({
      next: (res) => {
        this.store$.dispatch(stopLoading());
        if (res.result.data.badWordID) {
          if (this.mode === ePageActions.Create) {
            this.router.navigate(['../', res.result.data.badWordID], { relativeTo: this.route }).then();
          } else {
            if (res.result?.data) {
              this.data = res.result?.data;
              this.form.patchValue(res.result?.data);
            }
          }
        }
      },
      error: (err) => {
        const { errorCode } = err.error;
        if (errorCode === ERROR_CODES.ERROR_CODE_BAD_WORD_IS_EXISTING) {
          const control = this.form.get(eBadWordFormKeys.word);
          this.existWords.push(control?.value);
          control?.setErrors({ existed: true });
        }
        this.store$.dispatch(stopLoading());
      },
    });
  }

  sendApproval(): void {
    if (!this.data?.badWordID) {
      return;
    }
    this.store$.dispatch(startLoading());
    this.apiService.sendApproval({ badWordID: this.data.badWordID }).subscribe({
      next: () => {
        this.store$.dispatch(stopLoading());
        this.data!.contentStatus = eContentStatuses.AdminPending;
      },
      error: () => {
        this.store$.dispatch(stopLoading());
      },
    });
  }

  delete(): void {
    if (!this.data?.badWordID) {
      return;
    }
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
      this.store$.dispatch(startLoading());
      this.apiService.delete(this.data!.badWordID!).subscribe({
        next: () => {
          this.store$.dispatch(stopLoading());
          modalRef.close();
          this.router.navigate(['../'], { relativeTo: this.route, replaceUrl: true }).then();
        },
        error: () => {
          this.store$.dispatch(stopLoading());
        },
      });
    });
  }

  reviewing(data: IBadWord) {
    if (!data?.badWordID) {
      return;
    }
    this.store$.dispatch(startLoading());
    this.apiService.review({ badWordID: data.badWordID! }).subscribe({
      next: (res) => {
        this.store$.dispatch(stopLoading());
        if (res.statusCode == 200) {
          this.data = res?.result?.data;
        }
      },
      error: () => {
        this.store$.dispatch(stopLoading());
      },
    });
  }

  approve(): void {
    if (!this.data?.badWordID) {
      return;
    }

    const modalRef = this.modal.create({
      nzClassName: 'modal-confirm',
      nzCentered: true,
      nzContent: ConfirmModalComponent,
      nzData: {
        type: eConfirmModalTypes.Confirm,
        message: `Bạn đang chọn Đã duyệt dữ liệu. Dữ liệu được Đã duyệt sẽ được xuất bản lên hệ thống?`,
      } as IConfirmModal,
    });

    modalRef.componentInstance?.okEvent$.subscribe(() => {
      this.store$.dispatch(startLoading());
      this.apiService.approve({ badWordID: this.data!.badWordID! }).subscribe({
        next: (res) => {
          this.store$.dispatch(stopLoading());
          this.data = res?.result?.data;
          modalRef.close();
        },
        error: () => {
          this.store$.dispatch(stopLoading());
        },
      });
    });
  }

  reject(): void {
    if (!this.data?.badWordID) {
      return;
    }
    const modalRef = this.modal.create({
      nzClassName: 'modal-feedback',
      nzContent: TextFeedbackModalComponent,
      nzCentered: true,
      nzData: {
        title: 'Từ chối',
        message: 'Nhập lý do từ chối',
        textBtnOk: 'Từ chối',
        textBtnCancel: 'Hủy',
        isDangerAction: true,
      } as ITextFeedbackModal,
    });

    modalRef.getContentComponent().okEvent$.subscribe(({ isOk, message }: any) => {
      if (!isOk) {
        return;
      }
      this.store$.dispatch(startLoading());
      this.apiService.reject({ badWordID: this.data!.badWordID!, reason: message }).subscribe({
        next: (res) => {
          this.store$.dispatch(stopLoading());
          this.data = res?.result?.data;
          modalRef.close();
        },
        error: () => {
          this.store$.dispatch(stopLoading());
        },
      });
    });
  }

  validateExistWord(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (this.existWords.includes(value)) {
        return { existed: true };
      }
      return null;
    };
  }
}
