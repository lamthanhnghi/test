import { Component, OnDestroy, OnInit } from '@angular/core';
import { CONTACT_AND_SUPPORT_MENU_ITEMS } from '@shared/constants';
import { Subject } from 'rxjs';
import { ILoadingState, IMcBreadcrumb } from '@shared/models';
import { RouteUtils } from '@shared/utils';
import { eLayouts, eUserTypes, eViewMode } from '@shared/enums';
import { ContactService } from '@shared/contact.service';
import { IContact } from '@shared/contact.model';
import { Store } from '@ngrx/store';
import { startLoading, stopLoading } from '@shared/stores';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent implements OnDestroy, OnInit {
  menuItems = CONTACT_AND_SUPPORT_MENU_ITEMS;
  protected readonly RouteUtils = RouteUtils;
  protected readonly eViewMode = eViewMode;
  protected readonly eLayouts = eLayouts;
  userTypes: eUserTypes[] = [eUserTypes.Seller, eUserTypes.User];
  selectedIndex: 0 | 1 = 0;
  breadcrumbs: IMcBreadcrumb[] = [
    { title: 'common.contact-and-support', link: ['/'] },
    { title: 'common.contact', link: '/', disabled: true },
  ];
  data?: IContact;
  destroy$: Subject<void> = new Subject();

  constructor(private apiService: ContactService, private store$: Store<ILoadingState>) {}

  ngOnInit() {
    this.getByType(this.userTypes[this.selectedIndex]);
  }

  getByType(contactType: eUserTypes): void {
    this.store$.dispatch(startLoading());
    this.apiService.getByType(contactType).subscribe({
      next: (res) => {
        if (res.result?.data) {
          this.data = res.result.data;
        }
        this.store$.dispatch(stopLoading());
      },
      error: (err) => {
        console.error(err);
        this.store$.dispatch(stopLoading());
      },
    });
  }

  onTabChange(index: 0 | 1): void {
    this.selectedIndex = index;
    this.getByType(this.userTypes[this.selectedIndex]);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    return;
  }
}
