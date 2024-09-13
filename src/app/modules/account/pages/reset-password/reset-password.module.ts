import { NgModule } from '@angular/core';
import { ResetPasswordComponent } from './reset-password.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { AccountMasterLayoutModule } from '@modules/account/components';

@NgModule({
  declarations: [ResetPasswordComponent],
  imports: [
    RouterModule.forChild([{ path: '', component: ResetPasswordComponent }]),
    SharedModule,
    AccountMasterLayoutModule,
  ],
})
export class ResetPasswordModule {}
