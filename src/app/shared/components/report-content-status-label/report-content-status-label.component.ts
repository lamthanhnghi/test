import { Component, Input } from '@angular/core';
import { eReportContentStatus } from '@shared/enums';

@Component({
  selector: 'app-report-content-status-label',
  templateUrl: './report-content-status-label.component.html',
  styleUrl: './report-content-status-label.component.scss'
})
export class ReportContentStatusLabelComponent {
  @Input() status?: eReportContentStatus = eReportContentStatus.New;
  protected readonly eReportContentStatus = eReportContentStatus;
}
