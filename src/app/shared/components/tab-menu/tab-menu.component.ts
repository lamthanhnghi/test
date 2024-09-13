import { Component, Input } from '@angular/core';
import { MenuItemWithCounter } from '@shared/constants/side-menu.constant';

@Component({
  selector: 'app-tab-menu',
  templateUrl: './tab-menu.component.html',
  styleUrl: './tab-menu.component.scss',
})
export class TabMenuComponent {
  @Input() menuItems: MenuItemWithCounter[] = [];
}
