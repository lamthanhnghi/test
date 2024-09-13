import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DATE_TIME_FORMAT } from '@shared/constants';
import { IFeedbackInfo } from '@shared/feedback.model';
import { eReportHandleFormKeys } from '@modules/report/pages/seller-report-detail/seller-report-detail.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonHelpers } from '@shared/utils';

export const eFeedbackReplyFormKeys = {
  Reply: 'reply',
}

@Component({
  selector: 'app-comment-box',
  templateUrl: './comment-box.component.html',
  styleUrl: './comment-box.component.scss'
})
export class CommentBoxComponent {
  @Input() isReplying = false;
  @Input() withReply = true;
  @Input() canReact = true;
  @Input() data: IFeedbackInfo | undefined
  protected readonly DATE_TIME_FORMAT = DATE_TIME_FORMAT;

  form: FormGroup = new FormGroup({
    [eFeedbackReplyFormKeys.Reply]: new FormControl(null, [Validators.required]),
  });
  @Output() reply = new EventEmitter<object>();
  @Output() react = new EventEmitter<boolean>();

  submit() {
    if (this.form.invalid) {
      CommonHelpers.markFormDirty(this.form);
      return
    }

    this.reply?.emit(this.form.getRawValue());

    this.form.reset();
  }

  toggleUseful() {
    this.react?.emit(!this.data?.isUseful);
  }

  protected readonly eFeedbackReplyFormKeys = eFeedbackReplyFormKeys;
}
