import { Component, OnDestroy } from '@angular/core';
import {
  eProductCategoryFormKeys,
  IConfirmModal,
  ILoadingState,
  IMcBreadcrumb,
  IProductCategory,
  IProductCategoryPayload,
  IProductGroupItem,
  SsrSelection,
} from '@shared/models';
import { CommonHelpers, RouteUtils } from '@shared/utils';
import { eConfirmModalTypes, eContentStatuses, ePageActions, ERROR_CODES } from '@shared/enums';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmModalComponent } from '@shared/components';
import { IAttribute, startLoading, stopLoading } from '@shared/stores';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Store } from '@ngrx/store';
import { PackedUnitService, ProductCategoryService, ProductGroupService } from '@shared/services';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { DATE_FORMAT } from '@shared/constants';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrl: './category-detail.component.scss',
})
export class CategoryDetailComponent implements OnDestroy {
  breadcrumbs: IMcBreadcrumb[] = [
    { title: 'Danh mục', link: ['/', RouteUtils.CategoriesPage.Base] },
    { title: 'Danh mục', link: ['/', RouteUtils.CategoriesPage.Base] },
    { title: 'Chi tiết', link: '#', disabled: true },
  ];
  data?: IProductCategory;
  readonly eProductCategoryFormKeys = eProductCategoryFormKeys;
  readonly eContentStatuses = eContentStatuses;
  readonly ePageActions = ePageActions;
  destroy$: Subject<void> = new Subject();
  mode: ePageActions | any = ePageActions.Create;
  form: FormGroup = new FormGroup({
    [eProductCategoryFormKeys.Name]: new FormControl(null, [Validators.required]),
    [eProductCategoryFormKeys.ShortName]: new FormControl(null, [Validators.required]),
    [eProductCategoryFormKeys.Description]: new FormControl(null, []),
    [eProductCategoryFormKeys.ProductGroup]: new FormControl(null, [Validators.required]),
    [eProductCategoryFormKeys.SubCategories]: new FormControl([], []),
    [eProductCategoryFormKeys.Attributes]: new FormControl([], []),
  });

  /** Handle Sub Category */
  subCategoryValidation = (control: AbstractControl): any => {
    if (this.form.get(eProductCategoryFormKeys.SubCategories)?.value?.some((x: IProductCategory) => x.categoryName === control.value)) {
      return { duplicated: true };
    }
    return null;
  }
  subCategoryControl = new FormControl<string | undefined>(undefined, [this.subCategoryValidation]);
  subBlockList: string[] = []; // List of blocked categories, which are not allowed to be removed

  /** handle attribute selection */
  attributeControl = new FormControl(undefined);
  attributeSelection = new SsrSelection<IAttribute>({
    getDataFn: (query) =>
      this.attributeService.getList({ ...query }).pipe(takeUntil(this.destroy$)),
    }
  );
  attributeBlockList: string[] = []; // List of blocked attributes, which are not allowed to be removed

  /** handle product group selection */
  productGroupSelection = new SsrSelection<IProductGroupItem>({
    getDataFn: (query) =>
      this.productGroupService.getItems({ ...query }).pipe(takeUntil(this.destroy$)),
    }
  );

  constructor(
    private apiService: ProductCategoryService,
    private route: ActivatedRoute,
    private router: Router,
    private modal: NzModalService,
    private store$: Store<ILoadingState>,
    private attributeService: PackedUnitService,
    private productGroupService: ProductGroupService,
  ) {
    const state = this.router.getCurrentNavigation()?.extras.state;
    this.data = this.route.snapshot.data['dataResolved'];
    if (this.data?.productCategoryID) {
      this.mode = state?.['isEdit'] ? ePageActions.Edit : ePageActions.View;
      this.form.patchValue(this.data);
      const productGroup = { productGroupID: this.data.productGroupID, productGroupName: this.data?.productGroupName };
      this.form
        .get(eProductCategoryFormKeys.ProductGroup)
        ?.patchValue(productGroup);
      this.productGroupSelection.data = [productGroup];
      this.subBlockList = this.data?.subCategories?.map((x: IProductCategory) => x.categoryName!) ?? [];
      this.attributeBlockList = this.data?.attributes?.map((x: IAttribute) => x.attributeID!) ?? [];
    }
    this.updateBreadcrumb();

    this.attributeControl.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      if (value) {
        this.addAttribute(value);
        this.attributeControl.reset();
      }
    });
  }

  updateBreadcrumb(): void {
    if (this.mode === ePageActions.Create) {
      this.breadcrumbs[2].title = 'Thêm mới';
    } else if (this.mode === ePageActions.Edit) {
      this.breadcrumbs[2].title = 'Sửa';
    } else {
      this.breadcrumbs[2].title = 'Chi tiết';
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
      if (this.data?.productCategoryID) {
        this.store$.dispatch(startLoading());
        this.apiService.delete({ productCategoryID: this.data.productCategoryID }).subscribe({
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

  /** handle sub category */
  addSubCategory(): void {
    const list = this.form.get(eProductCategoryFormKeys.SubCategories)?.value ?? ([] as IProductCategory[]);
    const value = this.subCategoryControl?.value;
    if (!value) {
      return;
    }
    if (list.map((item: IProductCategory) => item.categoryName).includes(value)) {
      return;
    }
    this.form
      .get(eProductCategoryFormKeys.SubCategories)
      ?.patchValue([
        ...list,
        { categoryName: value, productCategoryID: CommonHelpers.uuid() },
      ]);
    this.subCategoryControl?.reset();
  }

  removeSubCategory(item: string): void {
    const list = this.form.get(eProductCategoryFormKeys.SubCategories)?.value ?? [];
    this.form.get(eProductCategoryFormKeys.SubCategories)?.patchValue(list.filter((x: string) => x !== item));
  }

  /** handle attribute selection */
  isHideAttribute(item: IAttribute): boolean {
    return this.form
      .get(eProductCategoryFormKeys.Attributes)
      ?.value?.some((x: IAttribute) => x.attributeID === item.attributeID);
  }

  addAttribute(item: IAttribute): void {
    const list = this.form.get(eProductCategoryFormKeys.Attributes)?.value ?? [];
    this.form.get(eProductCategoryFormKeys.Attributes)?.patchValue([...list, item]);
  }

  removeAttribute(item: IAttribute): void {
    const list = this.form.get(eProductCategoryFormKeys.Attributes)?.value ?? [];
    this.form
      .get(eProductCategoryFormKeys.Attributes)
      ?.patchValue(list.filter((x: IAttribute) => x.attributeID !== item.attributeID));
  }

  submit(): void {
    if (this.form.invalid) {
      CommonHelpers.markFormDirty(this.form);
      console.log('Form invalid', this.form);
      return;
    }
    this.store$.dispatch(startLoading());
    const payload: IProductCategoryPayload = {
      languageCode: 'vi',
      categoryName: this.form.get(eProductCategoryFormKeys.Name)?.value,
      categoryShortName: this.form.get(eProductCategoryFormKeys.ShortName)?.value,
      description: this.form.get(eProductCategoryFormKeys.Description)?.value,
      productGroupID: this.form.get(eProductCategoryFormKeys.ProductGroup)?.value?.productGroupID,
      subCategoryList: (this.form.get(eProductCategoryFormKeys.SubCategories)?.value ?? [])?.map((x: IProductCategory) => ({
        categoryName: x.categoryName,
      })),
      attributeList: (this.form.get(eProductCategoryFormKeys.Attributes)?.value ?? [])?.map((x: IAttribute) => ({
        attributeID: x.attributeID,
      })),
    };
    const api$ =
      this.mode === ePageActions.Create
        ? this.apiService.create(payload)
        : this.apiService.update(payload, this.data?.productCategoryID || '');
    api$.subscribe({
      next: (res) => {
        this.store$.dispatch(stopLoading());
        if (res.result.data.productCategoryID) {
          if (this.mode === ePageActions.Create) {
            this.router.navigate(['../', res.result.data.productCategoryID], { relativeTo: this.route }).then();
          } else {
            if (!res.result?.data) {
              this.data = res.result.data;
              this.form.patchValue({ ...this.data });
              this.mode = ePageActions.View;
            }
          }
        }
      },
      error: ({ error }) => {
        const code = error?.errorCode;
        if (code === ERROR_CODES.ERROR_CODE_PRODUCT_CATEGORY_NAME_IS_EXISTING) {
          this.form.get(eProductCategoryFormKeys.Name)?.setErrors({ existed: true });
        } else {
          this.form.get(eProductCategoryFormKeys.Name)?.setErrors(null);
        }

        if (code === ERROR_CODES.ERROR_CODE_PRODUCT_CATEGORY_SHORT_NAME_IS_EXISTING) {
          this.form.get(eProductCategoryFormKeys.ShortName)?.setErrors({ existed: true });
        } else {
          this.form.get(eProductCategoryFormKeys.ShortName)?.setErrors(null);
        }
        this.store$.dispatch(stopLoading());
      },
    });
  }

  ngOnDestroy() {
    this.attributeSelection.destroy();
    this.productGroupSelection.destroy();
    this.destroy$.next();
    this.destroy$.complete();
  }

  protected readonly DATE_FORMAT = DATE_FORMAT;
}
