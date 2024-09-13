import { Component, Input } from '@angular/core';
import { eFeedbackFilterType, eReportContentStatus } from '@shared/enums';

@Component({
  selector: 'app-feedback-filter-type-label',
  templateUrl: './feedback-filter-type-label.component.html',
  styleUrl: './feedback-filter-type-label.component.scss'
})
export class FeedbackFilterTypeLabelComponent {
  @Input() status?:eFeedbackFilterType = eFeedbackFilterType.New;

  protected readonly eReportContentStatus = eReportContentStatus;
  protected readonly eFeedbackFilterType = eFeedbackFilterType;
}
