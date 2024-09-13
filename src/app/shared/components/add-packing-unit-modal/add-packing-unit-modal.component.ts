import { Component, Inject, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { IAddPackingUnitModalSubmitPayload } from '@shared/users.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IAddPackingUnitModal, ITextFeedbackModal } from '@shared/models';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-add-packing-unit-modal',
  templateUrl: './add-packing-unit-modal.component.html',
  styleUrl: './add-packing-unit-modal.component.scss',
})
export class AddPackingUnitModalComponent implements OnDestroy {
  okEvent$ = new Subject<IAddPackingUnitModalSubmitPayload>();
  readonly formKeys = {
    name: 'name',
  };
  form: FormGroup = new FormGroup({
    [this.formKeys.name]: new FormControl('', {
      validators: [Validators.required],
    }),
  });
  config: IAddPackingUnitModal;

  constructor(
    public modalRef: NzModalRef,
    @Inject(NZ_MODAL_DATA) public data: ITextFeedbackModal,
  ) {
    this.config = data;
  }

  submit() {
    if (this.form.invalid) {
      console.log('invalid form', this.form.value);
      Object.values(this.form.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
      // form is invalid, do nothing
      return;
    }
    console.log('submitting', this.form.value);
    const data = {
      ...this.form.getRawValue(),
      isOk: true,
    };
    if (this.data.closeOnSubmit) {
      this.okEvent$.next(data);
      this.modalRef.close();
    } else {
      this.okEvent$.next(data);
    }
  }

  ngOnDestroy() {
    this.okEvent$.complete();
  }
}
