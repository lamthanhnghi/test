import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { AccountMasterLayoutComponent } from '@modules/account/components';

@NgModule({
  imports: [SharedModule],
  declarations: [AccountMasterLayoutComponent],
  exports: [AccountMasterLayoutComponent],
})
export class AccountMasterLayoutModule {}
