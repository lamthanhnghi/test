import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VerifyOtpComponent } from './verify-otp.component';
import { RouterModule } from '@angular/router';
import { AccountMasterLayoutModule } from '@modules/account/components';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: VerifyOtpComponent,
      },
    ]),
    SharedModule,
    AccountMasterLayoutModule,
  ],
  declarations: [VerifyOtpComponent],
})
export class VerifyOtpModule {}
