import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { RouteUtils } from '@shared/utils';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./pages/question-and-answer-list/question-and-answer-list.module').then(
        (m) => m.QuestionAndAnswerListModule,
      ),
  },
  {
    path: RouteUtils.CategoriesPage.Create,
    loadChildren: () =>
      import('./pages/question-and-answer-detail/question-and-answer-detail.module').then(
        (m) => m.QuestionAndAnswerDetailModule,
      ),
    data: {},
  },
  {
    path: RouteUtils.CategoriesPage.Detail,
    loadChildren: () =>
      import('./pages/question-and-answer-detail/question-and-answer-detail.module').then(
        (m) => m.QuestionAndAnswerDetailModule,
      ),
  },
];

@NgModule({
  imports: [SharedModule, RouterModule.forChild(routes)],
  exports: [],
})
export class QuestionAndAnswerModule {}
