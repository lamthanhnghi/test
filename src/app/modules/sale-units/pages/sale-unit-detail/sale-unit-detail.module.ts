import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SaleUnitDetailComponent } from './sale-unit-detail.component';
import { RouterModule, Routes } from '@angular/router';
import { saleUnitDetailResolver } from '@modules/sale-units/resolvers/sale-unit-detail.resolver';
import { FormsModule } from '@angular/forms';
import { ItemDetailMasterLayoutModule } from '@shared/item-detail-master-layout/item-detail-master-layout.module';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzColDirective, NzRowDirective } from 'ng-zorro-antd/grid';
import { NzFormControlComponent, NzFormDirective, NzFormItemComponent, NzFormLabelComponent } from 'ng-zorro-antd/form';
import { NzInputDirective } from 'ng-zorro-antd/input';
import { NzTransitionPatchDirective } from 'ng-zorro-antd/core/transition-patch/transition-patch.directive';
import { NzWaveDirective } from 'ng-zorro-antd/core/wave';
import { SharedModule } from '@shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';

const routes: Routes = [
  {
    path: '',
    component: SaleUnitDetailComponent,
    resolve: {
      dataResolved: saleUnitDetailResolver,
    },
  },
];

@NgModule({
  declarations: [
    SaleUnitDetailComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ItemDetailMasterLayoutModule,
    SharedModule,
  ]
})
export class SaleUnitDetailModule { }
