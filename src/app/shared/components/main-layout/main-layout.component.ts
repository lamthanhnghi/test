import { Component, Input, ViewEncapsulation } from '@angular/core';
import { IMcBreadcrumb, IMcMenuItem } from '@shared/models';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class MainLayoutComponent {
  @Input() scrollMode: 'page' | 'content' = 'content';
  @Input() layout: 'list' | 'detail' = 'list';
  @Input() breadcrumbs: IMcBreadcrumb[] = [];
  @Input() menuItems: IMcMenuItem[] = [];
  drawerOpen = false;
  toggleDrawer() {
    this.drawerOpen = !this.drawerOpen;
  }

  closeDrawer(): void {
    this.drawerOpen = false;
  }
}
