import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { IMcMenuItem } from '@shared/models';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class SideMenuComponent {
  @Input() menuItems: IMcMenuItem[] = [];
  @Output() itemClicked: EventEmitter<void> = new EventEmitter<void>();
}
