import { Component, OnInit } from '@angular/core';
import { IMcBreadcrumb } from '@shared/models';
import { RouteUtils } from '@shared/utils';
import { USER_MENU_ITEMS } from '@shared/constants/side-menu.constant';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss',
})
export class UserDetailComponent implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    if (!this.route.firstChild) {
      this.router.navigate(['.', RouteUtils.UsersPage.DetailInfo], {
        relativeTo: this.route,
        onSameUrlNavigation: 'ignore',
        replaceUrl: true
      });
    }
  }

  breadcrumbs: IMcBreadcrumb[] = [
    { title: 'Danh mục', link: ['/'] },
    { title: 'Users', link: ['/', RouteUtils.UsersPage.Base] },
    { title: 'Thông tin chi tiết', disabled: true, link: [] },
  ];
  protected readonly menuItems = USER_MENU_ITEMS;
}
