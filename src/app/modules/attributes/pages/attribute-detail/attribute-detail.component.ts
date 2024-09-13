import { Component } from '@angular/core';
import {
  eBrandFormKey, eProductCategoryFormKeys,
  IBrand,
  IBrandPayload,
  IConfirmModal,
  ILoadingState,
  IMcBreadcrumb, IProductCategory, IProductGroupItem,
  McUploadFile, SsrSelection
} from '@shared/models';
import { CommonHelpers, FormValidators, RouteUtils } from '@shared/utils';
import { Subject, takeUntil } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BrandService } from '@shared/brand.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Store } from '@ngrx/store';
import { AttributesService, MediaService, ProductCategoryService } from '@shared/services';
import {
  eAttributeFormKeys,
  IAttribute,
  IAttributePayload,
  showToast,
  startLoading,
  stopLoading,
  uploadFile
} from '@shared/stores';
import { eConfirmModalTypes, eContentStatuses, ePageActions, eToastStatus } from '@shared/enums';
import { ConfirmModalComponent } from '@shared/components';

@Component({
  selector: 'app-attribute-detail',
  templateUrl: './attribute-detail.component.html',
  styleUrl: './attribute-detail.component.scss'
})
export class AttributeDetailComponent {
  breadcrumbs: IMcBreadcrumb[] = [
    { title: 'Danh mục', link: ['/', RouteUtils.AttributesPage.Base] },
    { title: 'Tên phân loại', link: ['/', RouteUtils.AttributesPage.Base] },
    { title: 'Chi tiết', link: '#', disabled: true }
  ];
  data?: IAttribute | null;
  private sub: any;
  avatars: McUploadFile[] = [];
  destroy$ = new Subject<void>();
  logoControl = new FormControl<McUploadFile[]>([]);
  mode: ePageActions | any = ePageActions.Create;
  form: FormGroup = new FormGroup({
    [eAttributeFormKeys.Name]: new FormControl(null, [Validators.required]),
    [eAttributeFormKeys.Categories]: new FormControl([], [FormValidators.RequiredArray()]),
  });
  selectedCategories: IProductCategory[]= [];
  productCategorySelection = new SsrSelection<IProductCategory>({
      getDataFn: (query) =>
        this.productCategorieService.getItems({ ...query }).pipe(takeUntil(this.destroy$)),
    }
  );

  constructor(
    private apiService: AttributesService,
    private productCategorieService: ProductCategoryService,
    private route: ActivatedRoute,
    private router: Router,
    private modal: NzModalService,
    private store$: Store<ILoadingState>,
  ) {
    const state = this.router.getCurrentNavigation()?.extras.state;
    this.data = this.route.snapshot.data['dataResolved'];

    if (this.data?.attributeID) {
      this.mode = state?.['isEdit'] ? ePageActions.Edit : ePageActions.View;
      this.form.patchValue({
        [eAttributeFormKeys.Name]: this.data.attributeName,
        [eAttributeFormKeys.Categories]: this.data.categories,
      });
      this.selectedCategories = this.data.categories || [];

    }
    this.updateBreadcrumb();
  }



  updateBreadcrumb(): void {

    if (this.mode === ePageActions.Create) {
      this.breadcrumbs[this.breadcrumbs.length - 1].title = 'Thêm mới';
    } else if (this.mode === ePageActions.Edit) {
      this.breadcrumbs[this.breadcrumbs.length - 1].title = 'Sửa';
    } else {
      this.breadcrumbs[this.breadcrumbs.length - 1].title = 'Chi tiết';
    }
  }

  removeCategory(id: string): void {
    const list = this.form.get(eAttributeFormKeys.Categories)?.value ?? [];
    this.form.get(eAttributeFormKeys.Categories)?.patchValue(list.filter((x: IProductCategory) => x.productCategoryID !== id));
    this.selectedCategories = this.selectedCategories.filter((x: IProductCategory) => x.productCategoryID !== id);
  }

  compareCategory(a: IProductCategory, b: IProductCategory): boolean {
    if (!a || !b) return false;
    return a.productCategoryID === b.productCategoryID;
  }


  setCategory(items: IProductCategory) {
    this.form.get(eAttributeFormKeys.Categories)?.patchValue(items);
  }

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

  restore() {
    this.store$.dispatch(
      showToast({
        status: eToastStatus.Warning,
        title: 'Thông báo',
        message: 'Tính năng đang được cập nhật.',
      }),
    );
  }

  archive() {
    this.store$.dispatch(
      showToast({
        status: eToastStatus.Warning,
        title: 'Thông báo',
        message: 'Tính năng đang được cập nhật.',
      }),
    );
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
    //   if (this.data?.attributeID) {
    //     this.store$.dispatch(startLoading());
    //     this.apiService.delete({ attributeID: this.data.attributeID }).subscribe({
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
    const payload: IAttributePayload = {
      name: this.form.controls[eAttributeFormKeys.Name].value,
      productCategoryIDs: this.form.controls[eAttributeFormKeys.Categories].value?.map((i: IProductCategory) => i.productCategoryID) ?? [],
    };

    const api$ =
      this.mode === ePageActions.Create
        ? this.apiService.add(payload)
        : this.apiService.update({
          attributeID: this.data?.attributeID || '',
          ...payload
        });
    api$.subscribe({
      next: (res) => {
        this.store$.dispatch(stopLoading());
        if (res.result.data.attributeID) {
          if (this.mode === ePageActions.Create) {
            this.router.navigate(['../', res.result.data.attributeID], { relativeTo: this.route }).then();
          } else {
            if (!res.result?.data) {
              this.data = res.result.data;
              this.form.patchValue({ ...this.data });
              this.mode = ePageActions.View;
            }
          }
        }
      },
      error: (err) => {
        console.error(err);
        switch(err.error?.errorCode) {
          case "MSG0244":
            this.form.controls[eAttributeFormKeys.Name].setErrors({ duplicated: true });
            break ;
        }
        this.store$.dispatch(stopLoading());
      }
    });
  }

  protected readonly eContentStatuses = eContentStatuses;
  protected readonly ePageActions = ePageActions;
  protected readonly eAttributeFormKeys = eAttributeFormKeys;
}
