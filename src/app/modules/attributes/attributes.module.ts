import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RouteUtils } from '@shared/utils';
import { SharedModule } from '@shared/shared.module';


const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('@modules/attributes/pages/attribute-list/attribute-list.module').then((m) => m.AttributeListModule),
  },
  {
    path: RouteUtils.AttributesPage.Create,
    loadChildren: () => import('@modules/attributes/pages/attribute-detail/attribute-detail.module').then((m) => m.AttributeDetailModule),
    data: {},
  },
  {
    path: RouteUtils.AttributesPage.Detail,
    loadChildren: () => import('@modules/attributes/pages/attribute-detail/attribute-detail.module').then((m) => m.AttributeDetailModule)
  },
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class AttributesModule { }
