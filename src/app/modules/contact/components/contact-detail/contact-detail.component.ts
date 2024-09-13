import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IAddress, IEmail, ILoadingState, IMcBreadcrumb, IPhone } from '@shared/models';
import { eAddressLabels, eContentStatuses, eEmailLabels, ePageActions, ePhoneLabels, eUserTypes } from '@shared/enums';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Store } from '@ngrx/store';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  eContactFormKeys,
  IAddressPayload,
  IContact,
  IContactPayload,
  IEmailPayload,
  IPhonePayload,
} from '@shared/contact.model';
import {
  AddressModalComponent,
  ConfirmModalComponent,
  EmailModalComponent,
  PhoneModalComponent,
} from '@shared/components';
import { ContactService } from '@shared/contact.service';
import { startLoading, stopLoading } from '@shared/stores';

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrl: './contact-detail.component.scss',
})
export class ContactDetailComponent {
  @Input() userType: eUserTypes = eUserTypes.Seller;
  mode: ePageActions | any = ePageActions.View;
  breadcrumbs: IMcBreadcrumb[] = [
    { title: 'menu.home', link: ['/'] },
    { title: this.title, link: '#', disabled: true },
  ];
  data?: IContact;
  @Output() reloadEvent$ = new EventEmitter<void>();
  readonly eContactFormKeys = eContactFormKeys;
  form: FormGroup = new FormGroup({
    [eContactFormKeys.ContactName]: new FormControl(null, [Validators.required]),
  });
  isEdit = false;
  protected readonly eContentStatuses = eContentStatuses;
  protected readonly ePageActions = ePageActions;
  protected readonly ePhoneLabels = ePhoneLabels;
  protected readonly eEmailLabels = eEmailLabels;
  protected readonly eAddressLabels = eAddressLabels;

  constructor(
    private apiService: ContactService,
    private modal: NzModalService,
    private store$: Store<ILoadingState>,
  ) {}

  @Input() set item(value: IContact | undefined) {
    if (value?.contactID) {
      this.data = value;
      this.form.patchValue(this.data);
    }
  }

  get title(): string {
    return this.mode === ePageActions.View ? 'common.detail' : 'common.edit';
  }

  onBlurContactName(): void {
    if (this.isEdit) {
      this.saveContactName();
    }
  }

  saveContactName(): void {
    if (this.form.invalid) {
      return;
    }
    this.store$.dispatch(startLoading());
    const payload: IContactPayload = {
      contactID: this.data?.contactID,
      contactName: this.form.value[eContactFormKeys.ContactName]?.trim(),
      // contactType: this.userType === eUserTypes.User ? 10 : 20
    };
    this.apiService.update(payload).subscribe({
      next: (res) => {
        if (res.statusCode === 200) {
          this.isEdit = false;
          this.reloadEvent$.emit();
          return;
        }
        this.store$.dispatch(stopLoading());
      },
      error: (err) => {
        console.error(err);
        this.store$.dispatch(stopLoading());
      },
    });
  }

  addOrEditPhone(item?: IPhone): void {
    const modalRef = this.modal.create({
      nzClassName: 'modal-md',
      nzContent: PhoneModalComponent,
      nzData: {
        title: item ? 'profile_page.edit_phone' : 'profile_page.add_phone',
        closeOnSubmit: false,
        data: item || undefined,
      },
    });

    modalRef.getContentComponent().okEvent$.subscribe((data) => {
      const payload: IPhonePayload = {
        ...data,
        phoneID: item?.phoneID,
        contactID: this.data?.contactID,
      };
      const api$ = item ? this.apiService.updatePhone(payload) : this.apiService.createPhone(payload);
      this.store$.dispatch(startLoading());
      api$.subscribe({
        next: (res) => {
          if (res.result?.data) {
            this.reloadEvent$.emit();
            modalRef.close();
            return;
          }
          this.store$.dispatch(stopLoading());
        },
        error: (err) => {
          console.error(err);
          this.store$.dispatch(stopLoading());
        },
      });
    });
  }

  //devdev
  deletePhone(item: IPhone): void {
    const modalRef = this.modal.create({
      nzClassName: 'modal-md',
      nzContent: ConfirmModalComponent,
      nzData: {
        title: 'msg.confirm',
        closeOnSubmit: false,
        message: 'msg.confirm_delete_phone',
      },
    });

    modalRef.getContentComponent().okEvent$.subscribe((isOk) => {
      if (isOk) {
        this.store$.dispatch(startLoading());
        this.apiService.deletePhone(this.data!.contactID, item.phoneID).subscribe({
          next: (res) => {
            if (res.statusCode === 200) {
              this.reloadEvent$.emit();
              modalRef.close();
              return;
            }
            this.store$.dispatch(stopLoading());
          },
          error: (err) => {
            console.error(err);
            this.store$.dispatch(stopLoading());
          },
        });
      }
    });
  }

  addOrEditEmail(item?: IEmail): void {
    const modalRef = this.modal.create({
      nzClassName: 'modal-md',
      nzContent: EmailModalComponent,
      nzData: {
        title: item ? 'profile_page.edit_email' : 'profile_page.add_email',
        closeOnSubmit: false,
        data: item || undefined,
      },
    });

    modalRef.getContentComponent().okEvent$.subscribe((data) => {
      const payload: IEmailPayload = {
        ...data,
        emailID: item?.emailID,
        contactID: this.data?.contactID,
      };
      const api$ = item ? this.apiService.updateEmail(payload) : this.apiService.createEmail(payload);
      this.store$.dispatch(startLoading());
      api$.subscribe({
        next: (res) => {
          if (res.result?.data) {
            this.reloadEvent$.emit();
            modalRef.close();
            return;
          }
          this.store$.dispatch(stopLoading());
        },
        error: (err) => {
          console.error(err);
          this.store$.dispatch(stopLoading());
        },
      });
    });
  }

  deleteEmail(item: IEmail): void {
    const modalRef = this.modal.create({
      nzClassName: 'modal-md',
      nzContent: ConfirmModalComponent,
      nzData: {
        title: 'msg.confirm',
        closeOnSubmit: false,
        message: 'msg.confirm_delete_email',
      },
    });

    modalRef.getContentComponent().okEvent$.subscribe((isOk) => {
      if (isOk) {
        this.store$.dispatch(startLoading());
        this.apiService.deleteEmail(this.data!.contactID, item.emailID).subscribe({
          next: (res) => {
            if (res.statusCode === 200) {
              this.reloadEvent$.emit();
              modalRef.close();
              return;
            }
            this.store$.dispatch(stopLoading());
          },
          error: (err) => {
            console.error(err);
            this.store$.dispatch(stopLoading());
          },
        });
      }
    });
  }

  addOrEditAddress(item?: IAddress): void {
    const modalRef = this.modal.create({
      nzClassName: 'modal-lg',
      nzContent: AddressModalComponent,
      nzData: {
        title: item ? 'profile_page.edit_address' : 'profile_page.add_address',
        closeOnSubmit: false,
        data: item || undefined,
      },
    });

    modalRef.getContentComponent().okEvent$.subscribe((data) => {
      const payload: IAddressPayload = {
        ...data,
        addressID: item?.addressID,
        contactID: this.data?.contactID,
      };
      const api$ = item ? this.apiService.updateAddress(payload) : this.apiService.createAddress(payload);
      this.store$.dispatch(startLoading());
      api$.subscribe({
        next: (res) => {
          if (res.result?.data) {
            this.reloadEvent$.emit();
            modalRef.close();
            return;
          }
          this.store$.dispatch(stopLoading());
        },
        error: (err) => {
          console.error(err);
          this.store$.dispatch(stopLoading());
        },
      });
    });
  }

  deleteAddress(item: IAddress): void {
    const modalRef = this.modal.create({
      nzClassName: 'modal-md',
      nzContent: ConfirmModalComponent,
      nzData: {
        title: 'msg.confirm',
        closeOnSubmit: false,
        message: 'msg.confirm_delete_address',
      },
    });

    modalRef.getContentComponent().okEvent$.subscribe((isOk) => {
      if (isOk) {
        this.store$.dispatch(startLoading());
        this.apiService.deleteAddress(this.data!.contactID, item.addressID).subscribe({
          next: (res) => {
            if (res.statusCode === 200) {
              this.reloadEvent$.emit();
              modalRef.close();
              return;
            }
            this.store$.dispatch(stopLoading());
          },
          error: (err) => {
            console.error(err);
            this.store$.dispatch(stopLoading());
          },
        });
      }
    });
  }
}
