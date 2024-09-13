import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttributeDetailComponent } from './attribute-detail.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { attributeDetailResolver } from '@modules/attributes/resolvers/attribute-detail.resolver';
import { ItemDetailMasterLayoutModule } from '@shared/item-detail-master-layout/item-detail-master-layout.module';
import { UploadFileComponent } from '@shared/upload-file/upload-file.component';

const routes: Routes = [
  {
    path: "",
    component: AttributeDetailComponent,
    runGuardsAndResolvers: "always",
    resolve: {
      dataResolved: attributeDetailResolver,
    },
  }
]

@NgModule({
  declarations: [
    AttributeDetailComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    ItemDetailMasterLayoutModule,
    UploadFileComponent
  ]
})
export class AttributeDetailModule { }
