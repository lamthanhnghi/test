import { AfterViewChecked, ChangeDetectorRef, Component, Input, TemplateRef } from '@angular/core';
import { NzSubMenuComponent } from 'ng-zorro-antd/menu';
import { MenuItemWithCounter } from '@shared/constants';

@Component({
  selector: 'app-side-menu-master',
  templateUrl: './side-menu-master.component.html',
  styleUrl: './side-menu-master.component.scss',
})
export class SideMenuMasterComponent implements AfterViewChecked {
  @Input() menuItems: MenuItemWithCounter[] = [];

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterViewChecked() {
    this.cdr.detectChanges();
  }

  isOpen(element: NzSubMenuComponent): boolean {
    return (element.nzTitle as TemplateRef<any>).elementRef?.nativeElement?.parentElement?.parentElement?.querySelector(
      '.ant-menu-item-active',
    );
  }
}
