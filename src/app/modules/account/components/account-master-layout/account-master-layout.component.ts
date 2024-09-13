import { Component, Input, ViewEncapsulation } from '@angular/core';
import { RouteUtils } from '@shared/utils';

@Component({
  selector: 'app-account-master-layout',
  templateUrl: './account-master-layout.component.html',
  styleUrls: ['./account-master-layout.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class AccountMasterLayoutComponent {
  readonly RouteUtils = RouteUtils;
  @Input() heading = 'account_page.account';
  constructor() {}
}
