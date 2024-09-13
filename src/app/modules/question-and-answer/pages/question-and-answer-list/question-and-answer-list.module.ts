import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { QuestionAndAnswerListComponent } from './question-and-answer-list.component';
import { ItemListMasterLayoutModule } from '@shared/item-list-master-layout/item-list-master-layout.module';

const routes: Routes = [
  {
    path: '',
    component: QuestionAndAnswerListComponent,
  },
];

@NgModule({
  imports: [ItemListMasterLayoutModule, SharedModule, RouterModule.forChild(routes)],
  declarations: [QuestionAndAnswerListComponent],
})
export class QuestionAndAnswerListModule {}
