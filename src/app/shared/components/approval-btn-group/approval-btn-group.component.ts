import { Component, EventEmitter, Input, Output } from '@angular/core';
import { eBtnActions, eContentStatuses, ePageActions, eRoles } from '@shared/enums';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { TranslateModule } from '@ngx-translate/core';
import { DATE_FORMAT } from '@shared/constants';
import { DatePipe, NgIf } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { IApprovalStatusBase } from '@shared/models';

@Component({
  selector: 'app-approval-btn-group',
  standalone: true,
  imports: [NzButtonComponent, TranslateModule, DatePipe, NgIf, SharedModule],
  templateUrl: './approval-btn-group.component.html',
  styleUrl: './approval-btn-group.component.scss',
})
export class ApprovalBtnGroupComponent {
  @Input() data?: IApprovalStatusBase;
  @Input() role?: eRoles | number;
  @Input() isReviewer = false;
  @Input() mode: ePageActions | any = ePageActions.View;
  @Output() btnClicked: EventEmitter<eBtnActions> = new EventEmitter();
  protected readonly eContentStatuses = eContentStatuses;
  protected readonly ePageActions = ePageActions;
  protected readonly DATE_FORMAT = DATE_FORMAT;
  protected readonly eRoles = eRoles;
  protected readonly eBtnActions = eBtnActions;
}
