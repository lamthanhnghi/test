import { Component, Input } from '@angular/core';
import { IProductRating } from '@shared/product-rating.model';
import { DATE_TIME_FORMAT } from '@shared/constants';

@Component({
  selector: 'app-product-report-info',
  templateUrl: './product-report-info.component.html',
  styleUrl: './product-report-info.component.scss'
})
export class ProductReportInfoComponent {
  @Input() data: IProductRating | null = null;
  protected readonly DATE_TIME_FORMAT = DATE_TIME_FORMAT;
}
