import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RouteUtils } from '@shared/utils';
import { feedbackDetailResolver } from '@modules/feedback/resolvers/feedback-detail.resolver';
import { SharedModule } from '@shared/shared.module';
import { CommentBoxComponent } from './components/comment-box/comment-box.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('@modules/feedback/pages/feedback-list/feedback-list.module').then((m) => m.FeedbackListModule),
  },
  {
    path: RouteUtils.FeedbacksPage.Detail,
    loadChildren: () => import('@modules/feedback/pages/feedback-detail/feedback-detail.module').then((m) => m.FeedbackDetailModule),
    resolve: {
      dataResolved: feedbackDetailResolver,
    },
    runGuardsAndResolvers: "always"
  },
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class FeedbackModule { }
