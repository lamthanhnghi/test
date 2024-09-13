import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import {
  FormControl,
  FormGroup,
  UntypedFormArray,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import {
  eConfirmModalTypes,
  eContentStatuses, eDeliveryMethods,
  ePageActions,
  eSizeUnits,
  eToastStatus,
  eWeightUnits
} from '@shared/enums';
import {
  IBrand, IComment, ICommonResponse,
  IConfirmModal,
  ICountry,
  IEnumOption,
  ILoadingState, IPagination,
  IProduct,
  IProductCategory,
  IProductGroup,
  ISaleUnit,
  ITextFeedbackModal,
  McUploadFile
} from '@shared/models';
import { CommonHelpers } from '@shared/utils';
import { DATE_FORMAT, FALLBACK_IMAGE, PLACEHOLDER_IMAGE } from '@shared/constants';
import { CommentService, MediaService } from '@shared/services';
import { SsrSelection } from '@shared/ssr-selection.model';
import { Observable, Subject, takeUntil } from 'rxjs';
import { IAttribute, IAttrValue, showToast, startLoading, stopLoading } from '@shared/stores';
import { Store } from '@ngrx/store';
import { NzAutocompleteOptionComponent } from 'ng-zorro-antd/auto-complete';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { TextFeedbackModalComponent } from '@shared/text-feedback-modal/text-feedback-modal.component';
import { ConfirmModalComponent } from '@shared/components';
import { RequestingProductService } from '@shared/requesting-product.service';

const ProductMgtFormKeys = {
  LanguageID: 'languageID',
  avatarMediaIDS: 'avatarMediaIDS',
  Name: 'name',
  publishName: 'publishName',
  description: 'description',
  // -------------------------------------------------------------------------------------------------------------------
  keywords: 'keywords',
  productGroup: 'productGroup',
  ProductGroupID: 'productGroupID', // not used in form, using in api
  productCategory: 'productCategory',
  ProductCategoryID: 'productCategoryID', // not used in form, using in api
  producerName: 'producerName',
  madeInCountryID: 'madeInCountryID',
  brandName: 'brandName',
  brandNameID: 'brandNameID', // not used in form, using in api
  registerNo: 'registerNo',
  genuineDocMediaIDS: 'genuineDocMediaIDS',
  deliveryMethods: 'deliveryMethods',
  // -------------------------------------------------------------------------------------------------------------------
  productSKUName: 'productSKUName',
  attribute: 'attribute',
  ProductSKUs: 'productSKUs',
  ProductSKUID: 'productSKUID',
  saleUnit: 'saleUnit',
  attributeValue: 'attributeValue',
  TotalStock: 'totalStock',
  skuMediaUploadControl: 'skuMediaUploadControl',
  weight: 'weight',
  weightUnit: 'weightUnit',
  sizeLength: 'sizeLength',
  sizeWidth: 'sizeWidth',
  sizeHeight: 'sizeHeight',
  sizeUnit: 'sizeUnit',
  skuMedias: 'skuMedias',
};

@Component({
  selector: 'app-product-management',
  templateUrl: './product-management.component.html',
  styleUrl: './product-management.component.scss'
})
export class ProductManagementComponent implements OnDestroy, OnInit {
  protected readonly ProductMgtFormKeys = ProductMgtFormKeys;
  protected readonly PLACEHOLDER_IMAGE = PLACEHOLDER_IMAGE;
  protected readonly FALLBACK_IMAGE = FALLBACK_IMAGE;
  readonly eContentStatuses = eContentStatuses;
  @Input() data?: IProduct;
  @Output() reloadEvent = new EventEmitter<void>();

  form = new UntypedFormGroup({
    [ProductMgtFormKeys.LanguageID]: new UntypedFormControl('1', [Validators.required]),
    [ProductMgtFormKeys.avatarMediaIDS]: new UntypedFormControl([], [Validators.required]),
    [ProductMgtFormKeys.Name]: new UntypedFormControl('', [Validators.required]),
    [ProductMgtFormKeys.publishName]: new UntypedFormControl('', [Validators.required]),
    [ProductMgtFormKeys.description]: new UntypedFormControl('', [Validators.required]),
    // -----------------------------------------------------------------------------------------------------------------
    [ProductMgtFormKeys.keywords]: new UntypedFormControl([], [Validators.required]),
    [ProductMgtFormKeys.productGroup]: new UntypedFormControl(undefined, [Validators.required]),
    [ProductMgtFormKeys.productCategory]: new UntypedFormControl(undefined, [Validators.required]),
    [ProductMgtFormKeys.producerName]: new UntypedFormControl('', []),
    [ProductMgtFormKeys.madeInCountryID]: new UntypedFormControl('', [Validators.required]),
    [ProductMgtFormKeys.brandName]: new UntypedFormControl('', [Validators.required]),
    [ProductMgtFormKeys.brandNameID]: new UntypedFormControl('', []),
    [ProductMgtFormKeys.registerNo]: new UntypedFormControl('', []),
    [ProductMgtFormKeys.genuineDocMediaIDS]: new UntypedFormControl([], [Validators.required]),
    // -----------------------------------------------------------------------------------------------------------------
    [ProductMgtFormKeys.attribute]: new UntypedFormControl(undefined, [Validators.required]),
    [ProductMgtFormKeys.ProductSKUs]: new UntypedFormArray([]),
    // -----------------------------------------------------------------------------------------------------------------
    [ProductMgtFormKeys.deliveryMethods]: new UntypedFormControl('', []),
  });
  protected readonly ePageActions = ePageActions;
  avatarControl = new FormControl<McUploadFile[]>([]);
  draggingFile: any = null;
  avatars: McUploadFile[] = [];

  /** genuineDocs */
  genuineDocControl = new FormControl<McUploadFile[]>([]);
  genuineDocs: McUploadFile[] = [];

  /** sku media record */
  skuMediaRecord: Record<any, McUploadFile[]> = {};

  /** destroy$ */
  destroy$ = new Subject<void>();
  /** tags */
  tagInputVisible = false;
  @ViewChild('tagInputElement', { static: false }) tagInputElement?: ElementRef;
  @Input() mode: ePageActions = ePageActions.Create;

  /** handle keywords */
  keywordControl = new FormControl<string>('');

  /** brands */
  brandSelection = new SsrSelection<IBrand>();

  /** handle product group selection */
  productGroupSelection = new SsrSelection<IProductGroup>();

  /** handle countries */
  countries: ICountry[] = [];

  /** handle product category selection */
  productCategorySelection = new SsrSelection<IProductCategory>();

  /** handle attribute selection */
  attributeSelection = new SsrSelection<IAttribute>();

  /** handle all attribute values from SKU form array */
  attrValueSelection = new SsrSelection<IAttrValue>();

  /** handle sale unit selection */
  saleUnitSelection = new SsrSelection<ISaleUnit>();

  /** unit options */
  weightUnitOptions: IEnumOption[] = Array.from(Object.values(eWeightUnits))
    .filter((i) => !isNaN(Number(i)))
    .map((value) => ({ value, label: '' }));
  sizeUnitOptions: IEnumOption[] = Array.from(Object.values(eSizeUnits))
    .filter((i) => !isNaN(Number(i)))
    .map((value) => ({ value, label: '' }));
  deliveryTypeOptions: IEnumOption[] = Array.from(Object.values(eDeliveryMethods))
    .filter((i) => !isNaN(Number(i)))
    .map((value) => ({ value, label: '' }));

  getComments?: (pagination: IPagination) => Observable<ICommonResponse<IComment[]>>;
  addComment?: (payload: { content: string }) => Observable<ICommonResponse<IComment>>;

  constructor(
    private mediaService: MediaService,
    private store$: Store<ILoadingState>,
    private modalService: NzModalService,
    private requestingProductService: RequestingProductService,
    private commentService: CommentService
  ) {}

  ngOnInit() {
    if (this.data) {
      this.pathFormValue(this.data);
      this.getComments = (pagination: IPagination) =>
        this.commentService.getProductReviewRequests({ ...pagination, productVersionID: this.data!.productVersionID! });
      this.addComment = (payload: { content: string }) =>
        this.commentService.createProductReviewRequest({
          productVersionID: this.data!.productVersionID!,
          ...payload,
        });
    } else {
      this.addSKU();
    }
  }

  pathFormValue(product: IProduct): void {
    this.avatars = product.productAvatars?.map((a) => CommonHelpers.mediaToMcUploadFile(a)) || [];
    this.genuineDocs = product.productGenuineDocuments?.map((a) => CommonHelpers.mediaToMcUploadFile(a)) || [];
    this.skuMediaRecord = {};
    const selectAttribute = product?.productSKUs?.[0].attributes![0].attributeID
      ? {
          attributeID: product?.productSKUs?.[0].attributes![0].attributeID,
          attributeName: product?.productSKUs?.[0].attributes![0].attributeName ?? '@todo',
        }
      : undefined;
    this.form.patchValue(
      {
        [ProductMgtFormKeys.LanguageID]: '1',
        [ProductMgtFormKeys.avatarMediaIDS]: product.productAvatars?.map((a) => ({ mediaID: a.mediaID })) || [],
        [ProductMgtFormKeys.Name]: product?.productName ?? '',
        [ProductMgtFormKeys.publishName]: product.productPublishName ?? '',
        [ProductMgtFormKeys.description]: product.productDescription ?? '',
        [ProductMgtFormKeys.keywords]: product.keyWords?.map((k) => k.keyWordName) ?? [],
        [ProductMgtFormKeys.productGroup]: product.productGroup,
        [ProductMgtFormKeys.productCategory]: product.productCategory,
        [ProductMgtFormKeys.producerName]: product.producerName,
        [ProductMgtFormKeys.madeInCountryID]: product.productMadeIn,
        [ProductMgtFormKeys.brandName]: product.brandName,
        [ProductMgtFormKeys.registerNo]: product.registerNo,
        [ProductMgtFormKeys.genuineDocMediaIDS]:
          product.productGenuineDocuments?.map((a) => ({ mediaID: a.mediaID })) || [],
        [ProductMgtFormKeys.attribute]: selectAttribute,
        [ProductMgtFormKeys.deliveryMethods]: product.deliveryMethods ?? '',
      },
      { emitEvent: false },
    );
    this.countries = product.productMadeIn ? [{ countryID: product.productMadeIn!, countryName: product.productMadeInName ?? '...' }] : [];
    this.productGroupSelection.data = [product.productGroup!];
    this.productCategorySelection.data = [product.productCategory!];
    // this.brandSelection.data = [selectedBrand];
    this.attributeSelection.data = selectAttribute ? [selectAttribute] : [];
    this.saleUnitSelection.data = product.productSKUs?.map((item) => item.saleUnit!) ?? [];
    // patch SKU
    product?.productSKUs?.forEach((sku, index) => {
      const skuFormGroup = this.generateSKUFormGroup();
      skuFormGroup.patchValue(
        {
          [ProductMgtFormKeys.ProductSKUID]: sku.productSKUID,
          [ProductMgtFormKeys.productSKUName]: sku.productSKUName,
          [ProductMgtFormKeys.attributeValue]: sku.attributes![0].attributeValueName,
          [ProductMgtFormKeys.saleUnit]: sku.saleUnit,
          [ProductMgtFormKeys.weight]: sku.weight,
          [ProductMgtFormKeys.weightUnit]: sku.weightUnit,
          [ProductMgtFormKeys.sizeLength]: sku.sizeLength,
          [ProductMgtFormKeys.sizeWidth]: sku.sizeWidth,
          [ProductMgtFormKeys.sizeHeight]: sku.sizeHeight,
          [ProductMgtFormKeys.sizeUnit]: sku.sizeUnit,
          [ProductMgtFormKeys.skuMedias]: sku.skuMedias?.map((a) => CommonHelpers.mediaToMcUploadFile(a)) || [],
        },
        { emitEvent: false },
      );
      this.skuMediaRecord[index] = sku.skuMedias?.map((a) => CommonHelpers.mediaToMcUploadFile(a)) || [];
      this.formSKUArray.push(skuFormGroup);
    });
  }

  get formSKUArray(): UntypedFormArray {
    return this.form.controls[ProductMgtFormKeys.ProductSKUs] as UntypedFormArray;
  }

  get formSKUGroups(): FormGroup[] {
    return this.formSKUArray.controls as FormGroup[];
  }

  onBrandChange($event: NzAutocompleteOptionComponent): void {
    this.form.get(ProductMgtFormKeys.brandNameID)?.setValue($event.nzValue?.brandID);
  }

  addSKU(): void {
    const sku = this.generateSKUFormGroup();
    this.formSKUArray.push(sku);
    // after add sku, listen sku media upload control
    const index = this.formSKUArray.controls.indexOf(sku);
    sku
      .get(ProductMgtFormKeys.skuMediaUploadControl)
      ?.valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe((files) => {
        this.skuMediaRecord[index] = files;
        this.skuMediaRecord[index].forEach((file) => {
          file.upload$ = this.mediaService.upload(file).pipe(takeUntil(this.destroy$));
        });
      });
  }

  removeSKU(index: number): void {
    this.formSKUArray.removeAt(index);
    delete this.skuMediaRecord[index];
  }

  /** generate SKU form group */
  generateSKUFormGroup(): UntypedFormGroup {
    return new UntypedFormGroup({
      [ProductMgtFormKeys.ProductSKUID]: new UntypedFormControl('', []),
      [ProductMgtFormKeys.productSKUName]: new UntypedFormControl('', [Validators.required]),
      [ProductMgtFormKeys.attributeValue]: new UntypedFormControl('', [Validators.required]),
      [ProductMgtFormKeys.saleUnit]: new UntypedFormControl('', [Validators.required]),
      [ProductMgtFormKeys.weight]: new UntypedFormControl('', [Validators.required]),
      [ProductMgtFormKeys.weightUnit]: new UntypedFormControl('', [Validators.required]),
      [ProductMgtFormKeys.sizeLength]: new UntypedFormControl('', [Validators.required]),
      [ProductMgtFormKeys.sizeWidth]: new UntypedFormControl('', [Validators.required]),
      [ProductMgtFormKeys.sizeHeight]: new UntypedFormControl('', [Validators.required]),
      [ProductMgtFormKeys.sizeUnit]: new UntypedFormControl('', [Validators.required]),
      [ProductMgtFormKeys.registerNo]: new UntypedFormControl('', []),
      [ProductMgtFormKeys.skuMediaUploadControl]: new FormControl<McUploadFile[]>([]),
    });
  }

  /** handle admin actions */
  reject() {
    const modalRef = this.modalService.create({
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

    modalRef.getContentComponent().okEvent$.subscribe((payload) => {
      if (!payload.isOk) {
        return;
      }
      this.setStatus(eContentStatuses.AdminRejected, modalRef, payload.message);
    });
  }

  approve() {
    const modalRef = this.modalService.create({
      nzClassName: 'modal-confirm',
      nzCentered: true,
      nzContent: ConfirmModalComponent,
      nzData: {
        type: eConfirmModalTypes.Confirm,
        closeOnSubmit: true,
        message: `Bạn đang chọn Đã duyệt dữ liệu. Dữ liệu được Đã duyệt sẽ được xuất bản lên hệ thống?`,
      } as IConfirmModal,
    });

    modalRef.afterClose.subscribe((isOk) => {
      if (!isOk) {
        return;
      }
      this.setStatus(eContentStatuses.AdminApproved, modalRef);
    });
  }

  hide() {
    const modalRef = this.modalService.create({
      nzClassName: 'modal-feedback',
      nzContent: TextFeedbackModalComponent,
      nzCentered: true,
      nzData: {
        title: 'Ẩn',
        message:
          'Dữ liệu bị ẩn sẽ không xuất hiện hệ thống. Chủ sở hữu dữ liệu sẽ được thông báo việc ẩn này. Nhập lý do và chọn “Ẩn" để tiếp tục hoặc “Hủy” để hủy tác vụ.',
        textBtnOk: 'Ẩn',
        textBtnCancel: 'Hủy',
      } as ITextFeedbackModal,
    });

    modalRef.getContentComponent().okEvent$.subscribe((payload) => {
      if (!payload.isOk) {
        return;
      }
      this.setStatus(eContentStatuses.AdminHidden, modalRef, payload.message);
    });
  }

  archive() {
    const modalRef = this.modalService.create({
      nzClassName: 'modal-feedback',
      nzContent: TextFeedbackModalComponent,
      nzCentered: true,
      nzData: {
        title: 'Lưu trữ',
        message:
          'Dữ liệu bị lưu trữ sẽ không xuất hiện hệ thống. Chủ sở hữu dữ liệu sẽ được thông báo việc lưu trữ này. Nhập lý do và chọn “Lưu trữ" để tiếp tục hoặc “Hủy” để hủy tác vụ.',
        textBtnOk: 'Lưu trữ',
        textBtnCancel: 'Hủy',
      } as ITextFeedbackModal,
    });

    modalRef.getContentComponent().okEvent$.subscribe((payload) => {
      if (!payload.isOk) {
        return;
      }
      this.setStatus(eContentStatuses.AdminArchived, modalRef, payload.message);
    });
  }

  setStatus(newStatus: eContentStatuses, modalRef?: NzModalRef, message?: string) {
    if (!this.data) return;

    let observableObject = null;
    switch (newStatus) {
      case eContentStatuses.AdminReviewing: {
        observableObject = this.requestingProductService.review({
          productID: this.data.productID,
          productVersionID: this.data.productVersionID,
        });
        break;
      }
      case eContentStatuses.AdminApproved: {
        observableObject = this.requestingProductService.approve({
          productID: this.data.productID,
          productVersionID: this.data.productVersionID,
        });
        break;
      }
      case eContentStatuses.AdminRejected: {
        observableObject = this.requestingProductService.reject({
          productID: this.data.productID,
          productVersionID: this.data.productVersionID,
          reason: message,
        });
        break;
      }
      case eContentStatuses.AdminHidden: {
        observableObject = this.requestingProductService.hide({
          productID: this.data.productID,
          productVersionID: this.data.productVersionID,
          reason: message,
        });
        break;
      }
      case eContentStatuses.AdminArchived: {
        observableObject = this.requestingProductService.archive({
          productID: this.data.productID,
          productVersionID: this.data.productVersionID,
          reason: message,
        });
        break;
      }
    }

    if (!observableObject) return;
    this.store$.dispatch(startLoading());
    observableObject.pipe(takeUntil(this.destroy$)).subscribe({
      next: (res) => {
        if (res.statusCode == 200) {
          // this.getItem();
          this.reloadEvent.emit();
          this.store$.dispatch(
            showToast({
              status: eToastStatus.Success,
              title: 'msg.success',
              message: 'Chuyển trạng thái thành công',
            }),
          );
        }
        this.store$.dispatch(stopLoading());
        modalRef?.close();
      },
      error: () => {
        console.log('set status failed');
        this.store$.dispatch(stopLoading());
      },
    });
  }

  verifyChange(isCurrentVerified: boolean) {
    if (!this.data) {
      return;
    }
    this.store$.dispatch(startLoading());
    this.requestingProductService
      .verify({
        productID: this.data!.productID,
        productVersionID: this.data!.productVersionID,
        isVerify: !isCurrentVerified,
      })
      .subscribe({
        next: (res) => {
          if (res.statusCode == 200) {
            this.store$.dispatch(
              showToast({
                status: eToastStatus.Success,
                title: 'msg.success',
                message: 'msg.update_data_success',
              }),
            );
            this.data!.isVerify = !isCurrentVerified;
          }
          this.store$.dispatch(stopLoading());
        },
        error: () => {
          this.store$.dispatch(stopLoading());
        },
      });
  }

  sliceTagName(tag: string): string {
    const isLongTag = tag.length > 20;
    return isLongTag ? `${tag.slice(0, 20)}...` : tag;
  }

  get deliveryMethods(): number[] {
    return (
      this.form
        .get(ProductMgtFormKeys.deliveryMethods)
        ?.value?.split(',')
        .map(Number)
        .filter((x: number) => x > 0) ?? []
    );
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    this.brandSelection.destroy();
  }

  protected readonly DATE_FORMAT = DATE_FORMAT;
}
