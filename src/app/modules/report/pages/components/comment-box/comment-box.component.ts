import { Component, Input } from '@angular/core';
import { IReportInfo } from '@shared/report.model';
import { DATE_TIME_FORMAT } from '@shared/constants';
import { eReportType } from '@shared/enums';

@Component({
  selector: 'app-comment-box',
  templateUrl: './comment-box.component.html',
  styleUrl: './comment-box.component.scss'
})
export class CommentBoxComponent {
  @Input() data: IReportInfo | undefined
  protected readonly DATE_TIME_FORMAT = DATE_TIME_FORMAT;
  protected readonly eReportType = eReportType;
}
