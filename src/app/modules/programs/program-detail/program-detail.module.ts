import { NgModule } from '@angular/core';
import { ProgramDetailComponent } from './program-detail.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { UploadProgressModule } from '@shared/stores';
import { ItemDetailMasterLayoutModule } from '@shared/item-detail-master-layout/item-detail-master-layout.module';
import { CommentSectionComponent } from '@shared/comment-section/comment-section.component';

const routes: Routes = [
  {
    path: '',
    component: ProgramDetailComponent,
  },
];

@NgModule({
  declarations: [ProgramDetailComponent],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    UploadProgressModule,
    ItemDetailMasterLayoutModule,
    CommentSectionComponent,
  ],
})
export class ProgramDetailModule {}
