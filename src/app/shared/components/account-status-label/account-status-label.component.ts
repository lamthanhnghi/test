import { Component, Input } from '@angular/core';
import { eAccountStatus } from '@shared/enums';

@Component({
  selector: 'app-account-status-label',
  templateUrl: './account-status-label.component.html',
  styleUrl: './account-status-label.component.scss',
})
export class AccountStatusLabelComponent {
  @Input() status?: eAccountStatus;
  protected readonly eAccountStatus = eAccountStatus;
}
