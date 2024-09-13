import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { FormValidators, RouteUtils } from '@shared/utils';
import { IAccountState, IForgotPasswordCreatePassword, IVerifyOtpState } from '@shared/models';
import { forgotPasswordCreatePassword, selectVerifyOtpState } from '@shared/stores';

@Component({
  selector: 'mc-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class ResetPasswordComponent implements OnInit {
  readonly RouteUtils = RouteUtils;
  form: UntypedFormGroup;
  destroySubject = new Subject<void>();
  response?: IVerifyOtpState = undefined;
  passwordVisible = false;
  passwordConfirmVisible = false;

  constructor(
    private store$: Store<IAccountState>,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.form = new FormGroup<any>(
      {
        password: new FormControl('', [Validators.required, FormValidators.MustBeValidPassword('passwordPattern')]),
        passwordConfirm: new UntypedFormControl('', [Validators.required, this.confirmValidator]),
      },
      { updateOn: 'change' },
    );
  }

  ngOnInit() {
    this.store$
      .select(selectVerifyOtpState)
      .pipe(takeUntil(this.destroySubject))
      .subscribe((response) => {
        this.response = response;
        if (!this.response) {
          console.log('No sign up response! Redirecting to sign up page...');
          this.router.navigate(['../', RouteUtils.AccountPage.Signup], { relativeTo: this.route }).then();
        }
      });
  }

  confirmValidator = (control: UntypedFormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { error: true, required: true };
    } else if (control.value !== this.form.get('password')?.value) {
      return { pwdNotMatch: true, error: true };
    }
    return {};
  };

  submit(): void {
    if (this.form.valid && this.response) {
      const payload: IForgotPasswordCreatePassword = {
        adminID: this.response.adminID!,
        uuid: this.response.uuid,
        password: this.form.get('password')?.value,
      };
      this.store$.dispatch(forgotPasswordCreatePassword({ payload }));
    }
  }
}
