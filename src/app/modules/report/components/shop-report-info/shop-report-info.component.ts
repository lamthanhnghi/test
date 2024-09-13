import { Component, Input } from '@angular/core';
import { IReportData } from '@shared/report.model';

@Component({
  selector: 'app-shop-report-info',
  templateUrl: './shop-report-info.component.html',
  styleUrl: './shop-report-info.component.scss'
})
export class ShopReportInfoComponent {
  @Input() data: IReportData | null = null;
}
