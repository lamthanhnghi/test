import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FeedbackDetailComponent } from '@modules/feedback/pages/feedback-detail/feedback-detail.component';
import { ItemDetailMasterLayoutModule } from '@shared/item-detail-master-layout/item-detail-master-layout.module';
import { SharedModule } from '@shared/shared.module';
import { CommentBoxModule } from '@modules/feedback/components/comment-box/comment-box.module';

const routes: Routes = [
  {
    path: '',
    component: FeedbackDetailComponent,
  },
];

@NgModule({
  declarations: [
    FeedbackDetailComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    ItemDetailMasterLayoutModule,
    CommentBoxModule
  ]
})
export class FeedbackDetailModule { }
