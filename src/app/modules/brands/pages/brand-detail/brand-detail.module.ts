import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrandDetailComponent } from './brand-detail.component';
import { SharedModule } from '@shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { ItemDetailMasterLayoutModule } from '@shared/item-detail-master-layout/item-detail-master-layout.module';
import { UploadFileComponent } from '@shared/upload-file/upload-file.component';
import { brandDetailResolver } from '@modules/brands/resolvers/brand-detail.resolver';

const routes: Routes = [
  {
    path: "",
    component: BrandDetailComponent,
    resolve: {
      dataResolved: brandDetailResolver,
    },
    runGuardsAndResolvers: "always"
  }
]

@NgModule({
  declarations: [
    BrandDetailComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    ItemDetailMasterLayoutModule,
    UploadFileComponent
  ]
})
export class BrandDetailModule { }
