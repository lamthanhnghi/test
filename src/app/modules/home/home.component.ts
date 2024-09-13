import { AfterViewInit, Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { NzSubMenuComponent } from 'ng-zorro-antd/menu';
import { Router } from '@angular/router';
import { IMcMenuItem } from '@shared/models';
import { HOME_MENU, HomeMenuItem } from '@shared/constants/home-menu.constant';
import { AuthService } from '@shared/services';
import { eRoles } from '@shared/enums';
import { CommonHelpers } from '@shared/utils';
import { TranslateService } from '@ngx-translate/core';
import { FormControl } from '@angular/forms';
import { debounceTime, map, Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements AfterViewInit {
  menuItems: HomeMenuItem[] = [];
  @ViewChildren('subMenu') subMenus?: QueryList<NzSubMenuComponent>;
  @ViewChildren('menuItem') menuItemsRef?: QueryList<ElementRef>;
  role?: eRoles;
  searchCtrl = new FormControl('');
  searchTerm$: Observable<string> = this.searchCtrl.valueChanges.pipe(
    debounceTime(300),
    map((value) => value ?? ''),
  );

  constructor(
    private router: Router,
    private AuthService: AuthService,
    private translateService: TranslateService,
  ) {
    this.role = this.AuthService.getRole();
    // switch (this.role) {
    //   case eRoles.OperationAdmin: {
    //     this.menuItems = OPERATION_HOME_MENU;
    //     break;
    //   }
    //   case eRoles.DataAdmin: {
    //     this.menuItems = DATA_HOME_MENU;
    //     break;
    //   }
    //   case eRoles.CustomerServiceAdmin: {
    //     this.menuItems = CUSTOMER_SERVICE_HOME_MENU;
    //     break;
    //   }
    //   case eRoles.AccountantAdmin: {
    //     this.menuItems = ACCOUNTANT_HOME_MENU;
    //     break;
    //   }
    //   default: {
    //     this.menuItems = [];
    //   }
    // }
    //
    if (!this.role) {
      return;
    }
    this.menuItems = CommonHelpers.cloneObject(HOME_MENU)
      .filter((item) => item?.roles?.includes(this.role!)) // filter menu items based on the role
      .map((item) => ({ ...item, title: this.translateService.instant(item.title) })) // clone menu items
      // sort menu items based on title string
      .sort((a, b) => a.title.localeCompare(b.title));
  }

  ngAfterViewInit() {
    const subMenus = this.subMenus?.toArray();
    setTimeout(() => {
      subMenus?.forEach((subMenu) => {
        subMenu.setOpenStateWithoutDebounce(true);
      });
    }, 1);
  }

  isActive(menuItem: IMcMenuItem): boolean {
    // check if the current route is part of the menu item's route
    // use alternative to window.location.pathname to make it work with SSR
    let itemRoute = Array.isArray(menuItem.link) ? menuItem.link.join('/') : menuItem.link;
    if (itemRoute.startsWith('//')) {
      itemRoute = itemRoute.replace('//', '/');
    }
    return this.router.url.startsWith(itemRoute);
  }
}
