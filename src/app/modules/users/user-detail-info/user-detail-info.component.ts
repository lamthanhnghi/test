import { Component } from '@angular/core';
import { eAccountStatus, eContentStatuses } from '@shared/enums';
import { IUser } from '@shared/users.model';
import { Subject, takeUntil } from 'rxjs';
import { UsersService } from '@shared/users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Store } from '@ngrx/store';
import { ILoadingState } from '@shared/models';

@Component({
  selector: 'app-user-detail-info',
  templateUrl: './user-detail-info.component.html',
  styleUrl: './user-detail-info.component.scss',
})
export class UserDetailInfoComponent {
  // data: UserData = USERS_MOCK_DATA[0]

  protected readonly eUserStatuses = eAccountStatus;
  protected readonly eContentStatuses = eContentStatuses;
  data?: IUser;
  destroy$: Subject<void> = new Subject<void>();

  constructor(
    private apiService: UsersService,
    private route: ActivatedRoute,
    private router: Router,
    private modal: NzModalService,
    private store$: Store<ILoadingState>,
  ) {
    this.route.data.pipe(takeUntil(this.destroy$)).subscribe((data) => {
      this.data = data['dataResolved'];
    });
  }
}
