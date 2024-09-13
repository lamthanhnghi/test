import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import {
  IAddPackedUnitModal,
  IPackedUnitPayload,
  IPackedUnit,
  IPackedUnitValue,
} from '@shared/models';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';
import { CommonHelpers } from '@shared/utils';

@Component({
  selector: 'app-add-packed-unit-modal',
  templateUrl: './add-packed-unit-modal.component.html',
  styleUrl: './add-packed-unit-modal.component.scss',
})
export class AddPackedUnitModalComponent implements OnInit, OnDestroy {
  okEvent$ = new Subject<IPackedUnitPayload>();
  readonly formKeys = {
    name: 'name',
    isShowList: 'isShowList',
  };
  form: FormGroup = new FormGroup({
    [this.formKeys.name]: new FormControl('', {
      validators: [Validators.required],
    }),
    [this.formKeys.isShowList]: new FormControl(false),
  });
  isEdit = false;

  constructor(
    public modalRef: NzModalRef,
    @Inject(NZ_MODAL_DATA) public data: IAddPackedUnitModal,
  ) {
    this.isEdit = !!data.editData;
  }

  ngOnInit() {
    if (this.isEdit) {
      this.form.patchValue({
        name: this.data.isPackUnit
          ? (this.data.editData as IPackedUnit).attributeName
          : (this.data.editData as IPackedUnitValue).locAttributeValueName,
        isShowList: this.data.editData?.isShowList,
      });
    }
  }

  submit() {
    if (this.form.invalid) {
      // form is invalid, do nothing
      CommonHelpers.markFormDirty(this.form);
      return;
    }
    this.okEvent$.next({ ...this.form.getRawValue() });
  }

  ngOnDestroy() {
    this.okEvent$.complete();
  }
}
