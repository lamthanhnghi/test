import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { eAgreementTypes } from '@shared/enums';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-select-agreement-type-modal',
  templateUrl: './select-agreement-type-modal.component.html',
  styleUrl: './select-agreement-type-modal.component.scss',
})
export class SelectAgreementTypeModalComponent {
  protected readonly eAgreementTypes = eAgreementTypes;
  form: FormGroup = new FormGroup({
    agreementType: new FormControl(eAgreementTypes.User, [Validators.required]),
  });

  constructor(public modalRef: NzModalRef) {}

  submit(): void {
    this.modalRef.close(this.form.value.agreementType);
  }
}
