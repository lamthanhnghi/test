import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemDetailMasterLayoutComponent } from './item-detail-master-layout.component';
import { NzInputDirective, NzInputGroupComponent, NzInputGroupWhitSuffixOrPrefixDirective } from 'ng-zorro-antd/input';
import { SharedModule } from '@shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    NzInputDirective,
    NzInputGroupComponent,
    NzInputGroupWhitSuffixOrPrefixDirective,
    SharedModule,
    TranslateModule,
  ],
  exports: [ItemDetailMasterLayoutComponent],
  declarations: [ItemDetailMasterLayoutComponent],
})
export class ItemDetailMasterLayoutModule {}
