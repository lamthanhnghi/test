import { Component } from '@angular/core';
import { RouteUtils } from '@shared/utils';
import { IMcBreadcrumb } from '@shared/models';
import { MOCK_DATA_GROUPS } from '@modules/groups/pages/group-list/group-list.component';
import { eContentStatuses } from '@shared/enums';

@Component({
  selector: 'app-group-detail',
  templateUrl: './group-detail.component.html',
  styleUrl: './group-detail.component.scss',
})
export class GroupDetailComponent {
  breadcrumbItems: IMcBreadcrumb[] = [
    { title: 'Nhóm', link: ['/', RouteUtils.GroupsPage.Base] },
    { title: 'Chi tiết', link: '#', disabled: true },
  ];
  data = MOCK_DATA_GROUPS[1];
  protected readonly eContentStatuses = eContentStatuses;
}
