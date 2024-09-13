import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { NzSubMenuComponent } from 'ng-zorro-antd/menu';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItemWithCounter } from '@shared/constants/side-menu.constant';
import { eMenuClickEvents } from '@shared/enums';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss'],
})
export class MainMenuComponent implements AfterViewInit {
  @Input() menuItems: MenuItemWithCounter[] = [];
  @Output() clickEvent: EventEmitter<eMenuClickEvents> = new EventEmitter<eMenuClickEvents>();
  @ViewChildren('menuItemWithCollapse') subMenus?: QueryList<NzSubMenuComponent>;
  @ViewChildren('menuItem') menuItemsRef?: QueryList<ElementRef>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngAfterViewInit() {
    const subMenus = this.subMenus?.toArray();
    // setTimeout(() => {
    //   subMenus?.forEach((subMenu) => {
    //     subMenu.setOpenStateWithoutDebounce(true);
    //   });
    // }, 1);
  }

  isQueryActive(menuItem: MenuItemWithCounter): boolean {
    // check if the current route is part of the menu item's route
    // use alternative to window.location.pathname to make it work with SSR
    let itemRoute = Array.isArray(menuItem.link) ? menuItem.link.join('/') : menuItem.link;
    if (itemRoute.startsWith('//')) {
      itemRoute = itemRoute.replace('//', '/');
    }
    if (itemRoute.startsWith('.')) {
      itemRoute = itemRoute.replace('.', '');
    }
    if (menuItem['queryParams']) {
      itemRoute = `?${new URLSearchParams(menuItem['queryParams']).toString()}`;
    }
    return this.router.url.endsWith(itemRoute);
  }
}
