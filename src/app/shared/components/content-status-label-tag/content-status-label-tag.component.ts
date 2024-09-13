import { Component, Input } from '@angular/core';
import { eContentStatuses } from '@shared/enums';

@Component({
  selector: 'app-content-status-label-tag',
  templateUrl: './content-status-label-tag.component.html',
  styleUrl: './content-status-label-tag.component.scss'
})
export class ContentStatusLabelTagComponent {
  @Input() status?: eContentStatuses
  protected readonly eContentStatuses = eContentStatuses;
}
