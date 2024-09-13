import { Component, Inject, input, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { IFeedbackPayload, ITextFeedbackModal } from '@shared/models';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-text-feedback-modal',
  templateUrl: './text-feedback-modal.component.html',
  styleUrl: './text-feedback-modal.component.scss',
})
export class TextFeedbackModalComponent implements OnDestroy {
  okEvent$ = new Subject<IFeedbackPayload>();
  readonly formKeys = {
    feedbackInput: 'message',
  };
  form: FormGroup = new FormGroup({
    [this.formKeys.feedbackInput]: new FormControl('', {
      validators: [Validators.required],
    }),
  });
  config: ITextFeedbackModal;

  constructor(
    public modalRef: NzModalRef,
    @Inject(NZ_MODAL_DATA) public data: ITextFeedbackModal,
  ) {
    this.config = data;
  }

  submit() {
    if (this.form.invalid) {
      console.log('invalid form');
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

  protected readonly input = input;
}
