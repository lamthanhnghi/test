import { Component, Inject, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';
import { IAddUrlPayload, IUrlModal } from '@shared/models';
import { eDefaultStatus } from '@shared/enums';
import { CommonHelpers } from '@shared/utils';

@Component({
  selector: 'mc-url-modal',
  templateUrl: './url-modal.component.html',
  styleUrls: ['./url-modal.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class UrlModalComponent implements OnDestroy {
  okEvent$ = new Subject<IAddUrlPayload>();
  readonly urlFormKeys = {
    urlString: 'urlString',
    isDefault: 'isDefault',
  };
  form: FormGroup = new FormGroup({
    [this.urlFormKeys.urlString]: new FormControl(undefined, [Validators.required]),
    [this.urlFormKeys.isDefault]: new FormControl(false),
  });

  constructor(
    public modalRef: NzModalRef,
    @Inject(NZ_MODAL_DATA) public data: IUrlModal,
  ) {
    if (data.data) {
      this.form.patchValue(data.data);
      // check if email is default === 1
      this.form.get(this.urlFormKeys.isDefault)?.setValue(data.data.isDefault === eDefaultStatus.Default);
    }
  }

  submit() {
    if (this.form.invalid) {
      // form is invalid, do nothing
      return;
    }
    const data = {
      ...this.form.getRawValue(),
      isDefault: CommonHelpers.boolToNumber(this.form.value[this.urlFormKeys.isDefault]), // convert true/false to 1/0
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
