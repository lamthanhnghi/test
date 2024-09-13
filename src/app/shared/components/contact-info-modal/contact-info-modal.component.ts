import { Component, Inject, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';
import { IContactInfoModal, IContactInfoPayload } from '@shared/models';
import { FormValidators } from '@shared/utils';

@Component({
  selector: 'app-contact-info-modal',
  templateUrl: './contact-info-modal.component.html',
  styleUrls: ['./contact-info-modal.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class ContactInfoModalComponent implements OnDestroy {
  okEvent$ = new Subject<IContactInfoPayload>();
  readonly contactInfoFormKeys = {
    contactFullName: 'contactFullName',
    contactEmail: 'contactEmail',
    contactPhone: 'contactPhone',
    contactUrl: 'contactUrl',
  };
  form: FormGroup = new FormGroup({
    [this.contactInfoFormKeys.contactFullName]: new FormControl(undefined, []),
    [this.contactInfoFormKeys.contactEmail]: new FormControl(undefined, [FormValidators.MustBeEmail('emailPattern')]),
    [this.contactInfoFormKeys.contactPhone]: new FormControl(undefined, [FormValidators.MustBePhone('phonePattern')]),
    [this.contactInfoFormKeys.contactUrl]: new FormControl(undefined, []),
  });

  constructor(
    public modalRef: NzModalRef,
    @Inject(NZ_MODAL_DATA) public data: IContactInfoModal,
  ) {
    if (data.data) {
      this.form.patchValue(data.data);
    }
  }

  submit() {
    if (this.form.invalid) {
      // form is invalid, do nothing
      return;
    }
    const data = {
      ...this.form.getRawValue(),
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
