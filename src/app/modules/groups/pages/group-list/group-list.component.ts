import { AfterViewInit, Component } from '@angular/core';
import { GROUPS_MENU_ITEMS } from '@shared/constants/side-menu.constant';
import { RouteUtils } from '@shared/utils';
import { eContentStatuses, eViewMode } from '@shared/enums';

export type GroupData = {
  name: string;
  id: string;
  shortName: string;
  thumbnailUrl: string;
  desc: string;
  createdAt: string;
  contentStatus: eContentStatuses;
};

export const MOCK_DATA_GROUPS: GroupData[] = [
  {
    id: '1',
    name: 'Group name',
    shortName: 'Shortname',
    desc: 'Group description',
    thumbnailUrl: 'https://placehold.co/64x64',
    createdAt: '1/1/2023',
    contentStatus: eContentStatuses.Draft,
  },
  {
    id: '1',
    name: 'Group name',
    shortName: 'Shortname',
    desc: 'Group description',
    thumbnailUrl: 'https://placehold.co/64x64',
    createdAt: '1/1/2023',
    contentStatus: eContentStatuses.AdminPending,
  },
  {
    id: '1',
    name: 'Group name',
    shortName: 'Shortname',
    desc: 'Group description',
    thumbnailUrl: 'https://placehold.co/64x64',
    createdAt: '1/1/2023',
    contentStatus: eContentStatuses.AdminReviewing,
  },
  {
    id: '1',
    name: 'Group name',
    shortName: 'Shortname',
    desc: 'Group description',
    thumbnailUrl: 'https://placehold.co/64x64',
    createdAt: '1/1/2023',
    contentStatus: eContentStatuses.AdminRejected,
  },
  {
    id: '1',
    name: 'Group name',
    shortName: 'Shortname',
    desc: 'Group description',
    thumbnailUrl: 'https://placehold.co/64x64',
    createdAt: '1/1/2023',
    contentStatus: eContentStatuses.AdminApproved,
  },
  {
    id: '1',
    name: 'Group name',
    shortName: 'Shortname',
    desc: 'Group description',
    thumbnailUrl: 'https://placehold.co/64x64',
    createdAt: '1/1/2023',
    contentStatus: eContentStatuses.AdminArchived,
  },
];

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrl: './group-list.component.scss',
})
export class GroupListComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    throw new Error('Method not implemented.');
  }
  menuItems = GROUPS_MENU_ITEMS;
  groups = MOCK_DATA_GROUPS;

  constructor() {
    this.menuItems.find((c) => c.id == 'groups')!.collapsed = true;
  }

  protected readonly RouteUtils = RouteUtils;
  protected readonly eViewMode = eViewMode;
  protected readonly eContentStatuses = eContentStatuses;
}
