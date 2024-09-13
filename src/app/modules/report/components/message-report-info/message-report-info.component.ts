import { Component, Input } from '@angular/core';
import { IProductRating } from '@shared/product-rating.model';
import { IMessageData, IReportData, MemberInfo } from '@shared/report.model';
import { DATE_TIME_FORMAT } from '@shared/constants';

@Component({
  selector: 'app-message-report-info',
  templateUrl: './message-report-info.component.html',
  styleUrl: './message-report-info.component.scss'
})
export class MessageReportInfoComponent {
  @Input() data: IReportData | null = null;

  getOwner(message: IMessageData): MemberInfo | undefined {
    return this.data?.memberInfos.find((member) => member.memberID === message.memberID);
  }

  protected readonly DATE_TIME_FORMAT = DATE_TIME_FORMAT;
}
