import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentBoxComponent } from '@modules/report/pages/components/comment-box/comment-box.component';
import { SharedModule } from '@shared/shared.module';



@NgModule({
  declarations: [
    CommentBoxComponent
  ],
  exports: [
    CommentBoxComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class CommentBoxModule { }
