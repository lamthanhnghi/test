import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForgotPasswordComponent } from './forgot-password.component';
import { RouterModule } from '@angular/router';
import { AccountMasterLayoutModule } from '@modules/account/components';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: ForgotPasswordComponent,
      },
    ]),
    SharedModule,
    AccountMasterLayoutModule,
  ],
  declarations: [ForgotPasswordComponent],
})
export class ForgotPasswordModule {}
