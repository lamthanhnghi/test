import { Component, OnDestroy } from '@angular/core';
import { IConfirmModal, IEnumOption, ILoadingState, IMcBreadcrumb, McUploadFile } from '@shared/models';
import { CommonHelpers, RouteUtils } from '@shared/utils';
import { eConfirmModalTypes, eContentStatuses, ePageActions, eUserTypes } from '@shared/enums';
import { ActivatedRoute, Router } from '@angular/router';
import { startLoading, stopLoading } from '@shared/stores';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Store } from '@ngrx/store';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { ConfirmModalComponent } from '@shared/components';
import { DATE_FORMAT } from '@shared/constants';
import { eUserGuideFormKeys, ICreateUserGuidePayload, IUserGuide } from '@shared/user-guide.model';
import { UserGuideService } from '@shared/user-guide.service';

@Component({
  selector: 'app-user-guide-mgt-detail',
  templateUrl: './user-guide-mgt-detail.component.html',
  styleUrl: './user-guide-mgt-detail.component.scss',
})
export class UserGuideMgtDetailComponent implements OnDestroy {
  breadcrumbs: IMcBreadcrumb[] = [
    { title: 'Hướng dẫn sử dụng', link: ['/', RouteUtils.UserGuide.Base] },
    { title: 'Chi tiết', link: '#', disabled: true },
  ];
  avatars: McUploadFile[] = [];
  data?: IUserGuide;
  readonly eUserGuideFormKeys = eUserGuideFormKeys;
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
  private sub: any;
  mode: ePageActions | any = ePageActions.Create;
  destroy$: Subject<void> = new Subject<void>();
  form: FormGroup = new FormGroup({
    [eUserGuideFormKeys.Title]: new FormControl(null, [Validators.required]),
    [eUserGuideFormKeys.Content]: new FormControl(null, [Validators.required]),
    [eUserGuideFormKeys.Notes]: new FormControl(null, [Validators.required]),
    [eUserGuideFormKeys.Version]: new FormControl(null, [Validators.required]),
    [eUserGuideFormKeys.ContentStatus]: new FormControl(null, []),
    [eUserGuideFormKeys.UserGuideType]: new FormControl(this.typeOptions?.[0]?.value, [Validators.required]),
  });

  constructor(
    private apiService: UserGuideService,
    private route: ActivatedRoute,
    private router: Router,
    private modal: NzModalService,
    private store$: Store<ILoadingState>,
  ) {
    const state = this.router.getCurrentNavigation()?.extras.state;
    this.route.data.pipe(takeUntil(this.destroy$)).subscribe((data) => {
      this.data = data['dataResolved'];
      if (this.data?.userGuideID) {
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

  sendApproval(): void {}

  edit(): void {
    this.mode = ePageActions.Edit;
    this.updateBreadcrumb();
  }

  cancel(): void {
    switch(this.mode) {
      case ePageActions.Create:
        this.router.navigate(['../'], { relativeTo: this.route }).then();
        break;
      case ePageActions.Edit:
        this.mode = ePageActions.View;
        this.updateBreadcrumb();
        break;
    }
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
      if (this.data?.userGuideID) {
        this.store$.dispatch(startLoading());
        this.apiService.delete({ userGuideID: this.data.userGuideID }).subscribe({
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
    const payload: ICreateUserGuidePayload = {
      ...this.form.value,
    };
    const api$ =
      this.mode === ePageActions.Create
        ? this.apiService.create(payload)
        : this.apiService.update({ ...payload, userGuideID: this.data?.userGuideID || '' });
    api$.subscribe({
      next: (res) => {
        this.store$.dispatch(stopLoading());
        if (res.result.data.userGuideID) {
          if (this.mode === ePageActions.Create) {
            this.mode = ePageActions.View;
            this.router
              .navigate(['../', res.result.data.userGuideID], {
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
