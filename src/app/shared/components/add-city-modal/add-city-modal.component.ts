import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { IAddCityModal } from '@shared/models';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';
import { CommonHelpers } from '@shared/utils';
import { ICreateCityPayload } from '@shared/area-tree.model';

@Component({
  selector: 'app-add-city-modal',
  templateUrl: './add-city-modal.component.html',
  styleUrl: './add-city-modal.component.scss',
})
export class AddCityModalComponent implements OnInit, OnDestroy {
  okEvent$ = new Subject<ICreateCityPayload>();
  readonly formKeys = {
    name: 'name',
    code: 'code',
  };
  form: FormGroup = new FormGroup({
    [this.formKeys.name]: new FormControl('', {
      validators: [Validators.required],
    }),
    [this.formKeys.code]: new FormControl('', {
      validators: [Validators.required],
    }),
  });
  isEdit = false;

  constructor(
    public modalRef: NzModalRef,
    @Inject(NZ_MODAL_DATA) public data: IAddCityModal,
  ) {
    this.isEdit = !!data.data;
  }

  ngOnInit() {
    if (this.isEdit) {
      this.form.patchValue({
        name: this.data.data.name,
        code: this.data.data?.code,
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
