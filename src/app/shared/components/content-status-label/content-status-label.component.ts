import { Component, Input } from '@angular/core';
import { eContentStatuses } from '@shared/enums';

@Component({
  selector: 'app-content-status-label',
  templateUrl: './content-status-label.component.html',
  styleUrl: './content-status-label.component.scss',
})
export class ContentStatusLabelComponent {
  @Input() status?: eContentStatuses;
  protected readonly eContentStatuses = eContentStatuses;
}
