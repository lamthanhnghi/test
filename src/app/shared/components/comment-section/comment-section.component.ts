import { Component, Input, OnInit } from '@angular/core';
import { AntModule } from '@shared/modules/ant.module';
import { ReactiveFormsModule } from '@angular/forms';
import { LanguageFeatureModule } from '@shared/modules/language-feature.module';
import { SharedModule } from '@shared/shared.module';
import { IAuthState, IComment, ICommonResponse, IPagination } from '@shared/models';
import { DATE_TIME_FORMAT } from '@shared/constants';
import { CommentService } from '@shared/services';
import { Store } from '@ngrx/store';
import { selectUser } from '@shared/stores';
import { filter, Observable, take } from 'rxjs';

@Component({
  selector: 'app-comment-section',
  standalone: true,
  imports: [AntModule, ReactiveFormsModule, LanguageFeatureModule, SharedModule],
  templateUrl: './comment-section.component.html',
  styleUrl: './comment-section.component.scss',
})
export class CommentSectionComponent implements OnInit {
  readonly DATE_TIME_FORMAT = DATE_TIME_FORMAT;
  data: IComment[] = [];
  content = '';
  isLoading = false;
  userID = '';
  pagination: IPagination & { total?: number } = {
    offset: 0,
    limit: 5,
    total: 0,
  };
  @Input() objectID?: string;
  @Input() listApi?: (query: IPagination) => Observable<ICommonResponse<IComment[]>>;
  @Input() addApi?: (payload: { content: string }) => Observable<ICommonResponse<IComment>>;
  constructor(
    private api$: CommentService,
    private store$: Store<IAuthState>,
  ) {
    this.store$
      .select(selectUser)
      .pipe(
        filter((p) => !!p),
        take(1),
      )
      .subscribe((profile) => {
        this.userID = profile?.adminID ?? '';
      });
  }

  ngOnInit(): void {
    this.getList();
  }

  loadMore(): void {
    this.pagination.offset += this.pagination.limit;
    this.getList(true);
  }

  getList(isAppend = false): void {
    if (!this.listApi) {
      return;
    }
    this.isLoading = true;
    this.listApi?.(this.pagination).subscribe({
      next: (res) => {
        if (isAppend) {
          this.data = [...this.data, ...(res?.result?.data ?? [])];
        } else {
          this.data = res?.result?.data ?? [];
        }
        this.isLoading = false;
        this.pagination.total = res?.result?.total ?? 0;
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  add(): void {
    if (!this.addApi) {
      return;
    }
    this.isLoading = true;
    this.addApi({ content: this.content }).subscribe({
      next: (res) => {
        if (res?.result?.data) {
          this.data = [res?.result?.data, ...this.data];
          this.pagination.offset += 1;
          this.pagination.total = this.pagination.total! + 1;
          this.isLoading = false;
        }
      },
      error: () => {
        this.pagination.offset = 1;
        this.getList();
      },
    });
  }
}
