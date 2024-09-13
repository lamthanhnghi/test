import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { ICreateDistrictPayload } from '@shared/area-tree.model';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NZ_MODAL_DATA, NzModalFooterDirective, NzModalRef, NzModalTitleDirective } from 'ng-zorro-antd/modal';
import { IAddDistrictModal } from '@shared/models';
import { CommonHelpers } from '@shared/utils';
import { TranslateModule } from '@ngx-translate/core';
import { NzFormControlComponent, NzFormDirective, NzFormItemComponent, NzFormLabelComponent } from 'ng-zorro-antd/form';
import { NzInputDirective } from 'ng-zorro-antd/input';
import { NzColDirective } from 'ng-zorro-antd/grid';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NgIf } from '@angular/common';
import { SharedModule } from '@shared/shared.module';

@Component({
  selector: 'app-add-district-ward-modal',
  templateUrl: './add-district-ward-modal.component.html',
  styleUrl: './add-district-ward-modal.component.scss',
  imports: [
    TranslateModule,
    ReactiveFormsModule,
    NzFormDirective,
    NzModalTitleDirective,
    NzFormItemComponent,
    NzFormLabelComponent,
    NzFormControlComponent,
    NzInputDirective,
    NzColDirective,
    NzModalFooterDirective,
    NzButtonComponent,
    NgIf,
    SharedModule,
  ],
  standalone: true,
})
export class AddDistrictWardModalComponent implements OnInit, OnDestroy {
  okEvent$ = new Subject<ICreateDistrictPayload>();
  readonly formKeys = {
    name: 'name',
  };
  form: FormGroup = new FormGroup({
    [this.formKeys.name]: new FormControl('', {
      validators: [Validators.required],
    }),
  });
  isEdit = false;

  constructor(
    public modalRef: NzModalRef,
    @Inject(NZ_MODAL_DATA) public data: IAddDistrictModal,
  ) {
    this.isEdit = !!data.data;
  }

  ngOnInit() {
    if (this.isEdit) {
      this.form.patchValue({
        name: this.data.data.name,
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
