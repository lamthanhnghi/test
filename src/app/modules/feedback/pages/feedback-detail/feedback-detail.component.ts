import { Component } from '@angular/core';
import { IMcBreadcrumb } from '@shared/models';
import { IFeedbackData, IFeedbackInfo } from '@shared/feedback.model';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject, takeUntil } from 'rxjs';
import { eFeedbackFilterType, eRatingReportType, eReportType, eReportUserType } from '@shared/enums';
import { FeedbackService } from '@shared/feedback.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonHelpers } from '@shared/utils';
import { IReportInfo } from '@shared/report.model';
import { eFeedbackReplyFormKeys } from '@modules/feedback/components/comment-box/comment-box.component';



@Component({
  selector: 'app-feedback-detail',
  templateUrl: './feedback-detail.component.html',
  styleUrl: './feedback-detail.component.scss'
})
export class FeedbackDetailComponent {
  breadcrumbs: IMcBreadcrumb[] = [
    {title: "feedback_page.title", link: ".."},
    {title: "common.detail", disabled: true, link: "."},
  ]
  destroy$: Subject<void> = new Subject<void>();
  data: IFeedbackData | null = null;

  titleConfig = {
    icon: "filled-info",
    color: "text-[#FF549C]",
  };
  isReacting = false;
  isReplying = false;

  constructor(
    private apiService: FeedbackService,
    private store$: Store,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.data.pipe(takeUntil(this.destroy$)).subscribe((data) => {

      this.data = data['dataResolved'];
    });

  }

  getInfo() : IFeedbackInfo | undefined {
    if (!this.data) return undefined;
    return {
      avatar: this.data.creator.creatorAvatar,
      name: this.data.creator.creatorName,
      feedbackDate: this.data.createdDate,
      fromUserType: this.data.creator.creatorType,
      content: this.data.topicDescription,
      isUseful: this.data.isUseful,
      adminReply: this.data.adminReply,
      adminReplyDate: this.data.adminReplyDate,
      medias: this.data.medias,
    }
  }

  setStatus(status: eFeedbackFilterType): void {

    if (!this.data) return;

    let observable: Observable<any> | null = null;

    switch(status) {
      case eFeedbackFilterType.Reviewing: {
        observable = this.apiService.review({
          feedbackID: this.data.feedbackID,
        })
        break;
      }
      case eFeedbackFilterType.Handled: {

        observable = this.apiService.handle({
          feedbackID: this.data.feedbackID,
        })
        break;
      }
    }

    observable?.subscribe(() => {
      // Do something
      this.router
        .navigate(["..", this.data?.feedbackID], {
          relativeTo: this.route,
          onSameUrlNavigation: 'reload',
        })
        .then();
    })
  }

  toggleUseful(isUseful: boolean): void {
    if (!this.data) return;

    this.isReacting = true;

    this.apiService.markUseful({
      feedbackID: this.data.feedbackID,
    }).subscribe(() => {
      // Do something
      this.isReacting = false;
      this.router
        .navigate(["..", this.data?.feedbackID], {
          relativeTo: this.route,
          onSameUrlNavigation: 'reload',
        })
        .then();
    })
  }

  reply(data: any): void {
    if (!this.data) return;

    this.isReplying = true;

    this.apiService.reply({
      feedbackID: this.data.feedbackID,
      adminReply: data[eFeedbackReplyFormKeys.Reply] as string,
    }).subscribe(() => {
      // Do something
      this.isReplying = false;
      this.router
        .navigate(["..", this.data?.feedbackID], {
          relativeTo: this.route,
          onSameUrlNavigation: 'reload',
        })
        .then();
    })
  }

  protected readonly eFeedbackFilterType = eFeedbackFilterType;
}
