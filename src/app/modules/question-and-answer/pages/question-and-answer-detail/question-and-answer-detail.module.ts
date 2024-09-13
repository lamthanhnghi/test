import { NgModule } from '@angular/core';
import { QuestionAndAnswerDetailComponent } from './question-and-answer-detail.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { ItemDetailMasterLayoutModule } from '@shared/item-detail-master-layout/item-detail-master-layout.module';
import { UploadProgressModule } from '@shared/stores';
import { questionAndAnswerDetailResolver } from '@modules/question-and-answer/resolvers/question-and-answer-detail.resolver';

const routes: Routes = [
  {
    path: '',
    component: QuestionAndAnswerDetailComponent,
    resolve: {
      dataResolved: questionAndAnswerDetailResolver,
    },
  },
];

@NgModule({
  declarations: [QuestionAndAnswerDetailComponent],
  exports: [QuestionAndAnswerDetailComponent, UploadProgressModule],
  imports: [ItemDetailMasterLayoutModule, SharedModule, RouterModule.forChild(routes)],
})
export class QuestionAndAnswerDetailModule {}
