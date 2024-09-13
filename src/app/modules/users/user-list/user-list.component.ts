import { Component, OnDestroy, OnInit } from '@angular/core';
import { USERS_MENU_ITEMS } from '@shared/constants/side-menu.constant';
import { eAccountStatus, eRoles, eToastStatus } from '@shared/enums';
import { IAddUserModal, IFilterBase, IMcMenuItem } from '@shared/models';
import { skip, Subject, takeUntil } from 'rxjs';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { IGetUserListPayload, IUser } from '@shared/users.model';
import { ActivatedRoute, Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AddUserModalComponent } from '@shared/add-user-modal/add-user-modal.component';
import { UsersService } from '@shared/users.service';
import { Store } from '@ngrx/store';
import { showToast, startLoading, stopLoading } from '@shared/stores';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
})
export class UserListComponent implements OnDestroy, OnInit {
  readonly eRoles = eRoles;
  loading = false;
  filterObject: IFilterBase = {
    pageIndex: 1,
    pageSize: 1,
    total: 0,
    accountStatus: eAccountStatus.All,
    search: '',
  };
  destroy$: Subject<void> = new Subject();
  tableQueryParamsChange$ = new Subject<NzTableQueryParams>();
  menuItems = USERS_MENU_ITEMS;
  data: IUser[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private usersService: UsersService,
    private modal: NzModalService,
    private store$: Store,
  ) {
    const statuses = this.menuItems[0].children!.map((item) => item['queryParams']?.status?.toString());
    this.route.queryParamMap.pipe(takeUntil(this.destroy$)).subscribe((params) => {
      if (!params.has('status') || !statuses.includes(params.get('status'))) {
        this.router.navigate([], { queryParams: { status: statuses[0] }, replaceUrl: true }).then();
      } else {
        this.filterObject.accountStatus = Number(params.get('status'));
        this.resetPagination();
        this.getCounters();
        this.getItems(this.filterObject);
      }
    });
    this.tableQueryParamsChange$.pipe(takeUntil(this.destroy$), skip(1)).subscribe((params) => {
      this.onQueryParamsChange(params);
    });
  }

  resetPagination(): void {
    this.filterObject.pageIndex = 1;
    this.filterObject.pageSize = 10;
  }

  ngOnInit(): void {
    // this.getCounters();
    this.router.navigate([], {
      queryParams: {
        status: eAccountStatus.All,
      },
    });
  }

  ngOnDestroy() {
    this.destroy$.complete();
    return;
  }

  getCounters() {
    this.usersService
      .getCounters()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          if (res.statusCode == 200) {
            this.menuItems[0].children = (
              this.menuItems[0].children as (IMcMenuItem & {
                count: number;
                onClick?: () => void;
              })[]
            ).map((item) => {
              switch (item.id) {
                case eAccountStatus.All.toString(): {
                  item.count = res.result.countAll;
                  return item;
                }
                case eAccountStatus.Activated.toString(): {
                  item.count = res.result.countActive;
                  return item;
                }
                case eAccountStatus.Locked.toString(): {
                  item.count = res.result.countBlock;
                  return item;
                }
                default: {
                  return item;
                }
              }
            });
          }
        },
        error: () => {
          console.log('get counters failed');
        },
      });
  }

  onSearchKeywordChange(keyword: string) {
    this.filterObject.search = keyword;
    this.filterObject.pageIndex = 1;
    this.getItems(this.filterObject);
  }

  openAddUserModal() {
    const modalRef = this.modal.create({
      nzClassName: 'modal-add modal-add-user',
      nzCentered: true,
      nzContent: AddUserModalComponent,
      nzData: {
        title: 'Thêm tài khoản',
        closeOnSubmit: false,
      } as IAddUserModal,
    });

    modalRef.getContentComponent().okEvent$.subscribe((payload) => {
      if (!payload.isOk) {
        return;
      }
      this.store$.dispatch(startLoading());
      this.usersService
        .createAdmin({
          adminCode: payload.code,
          adminFullName: payload.name,
          adminLogin: payload.loginID,
          adminRole: payload.role,
        })
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (res) => {
            if (res.statusCode == 200) {
              this.getItems(this.filterObject);
              this.getCounters();
            }
            this.store$.dispatch(stopLoading());
            this.store$.dispatch(
              showToast({
                status: eToastStatus.Success,
                title: 'msg.success',
                message: 'Tài khoản đã được tạo thành công',
              }),
            );
            modalRef?.close();
          },
          error: () => {
            console.log('create failed');
            this.store$.dispatch(stopLoading());
          },
        });
    });
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    const { pageSize, pageIndex, sort, filter } = params;
    const currentSort = sort.find((item) => item.value !== null);
    const sortField = (currentSort && currentSort.key) || undefined;
    const sortOrder = (currentSort && currentSort.value) || undefined;
    this.filterObject = {
      ...this.filterObject,
      pageIndex,
      pageSize,
      sortField,
      sortOrder,
      filter,
    };
  }

  getItems(filter: IFilterBase) {
    const pagination: IGetUserListPayload = {
      offset: (filter.pageIndex - 1) * filter.pageSize,
      limit: filter.pageSize,
      accountStatus:
        (filter.accountStatus as eAccountStatus) === -1 ? undefined : (filter.accountStatus as eAccountStatus),
      search: filter.search,
    };
    this.loading = true;
    this.usersService
      .getItems(pagination)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          if (res.statusCode == 200) {
            this.data = res.result.admins || [];
            this.filterObject.total = res.result.total || 0;
          }
          this.loading = false;
        },
        error: () => {
          console.log('get items failed');
          this.loading = false;
        },
      });
  }

  onPageSizeChange() {
    this.filterObject.pageIndex = 1;
    this.getItems(this.filterObject);
  }

  onPageIndexChange(pageIndex: number) {
    this.filterObject.pageIndex = pageIndex;
    this.getItems(this.filterObject);
  }
}
