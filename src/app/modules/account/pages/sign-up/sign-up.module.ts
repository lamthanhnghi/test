import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { AccountMasterLayoutModule } from '@modules/account/components';
import { SignUpComponent } from '@modules/account/pages/sign-up/sign-up.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: SignUpComponent,
      },
    ]),
    SharedModule,
    AccountMasterLayoutModule,
  ],
  declarations: [SignUpComponent],
})
export class SignUpModule {}
