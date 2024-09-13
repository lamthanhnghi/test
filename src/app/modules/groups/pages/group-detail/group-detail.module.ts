import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupDetailComponent } from './group-detail.component';
import { ItemDetailMasterLayoutModule } from '@shared/item-detail-master-layout/item-detail-master-layout.module';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { TranslateModule } from '@ngx-translate/core';
@NgModule({
  imports: [CommonModule, ItemDetailMasterLayoutModule, NzButtonComponent, TranslateModule],
  declarations: [GroupDetailComponent],
  exports: [GroupDetailComponent],
})
export class GroupDetailModule {}
