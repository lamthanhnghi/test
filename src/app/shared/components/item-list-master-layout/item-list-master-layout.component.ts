import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CATEGORY_MENU_ITEMS } from '@shared/constants/side-menu.constant';
import { debounceTime, Subject } from 'rxjs';
import { IMcBreadcrumb } from '@shared/models';
import { eLayouts } from '@shared/enums';

@Component({
  selector: 'app-item-list-master-layout',
  templateUrl: './item-list-master-layout.component.html',
  styleUrl: './item-list-master-layout.component.scss',
})
export class ItemListMasterLayoutComponent implements OnInit {
  ngOnInit(): void {
    this.search$.pipe(debounceTime(300)).subscribe((searchValue) => {
      this.searchInputChange.emit(searchValue);
    });
  }

  search$ = new Subject<string>();
  @Input() menuItems = CATEGORY_MENU_ITEMS;
  @Input() menuStyle: 'normal' | 'multiple' = 'normal';
  @Input() heading = '';
  @Input() crumbs: IMcBreadcrumb[] = [];
  @Input() layout: eLayouts = eLayouts.Fixed;
  @Output() searchInputChange = new EventEmitter<string>();
  @Input() shouldBeInSection = true;

  onInputChange(event: any) {
    this.search$.next(event.target.value);
  }

  protected readonly eLayouts = eLayouts;
}
