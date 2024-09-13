import { Component, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import { getGlobalLoading, getLoadingCount } from '@shared/stores';
import { ILoadingState } from '@shared/models';

@Component({
  selector: 'app-loading-overlay',
  templateUrl: './loading-overlay.component.html',
  styleUrls: ['./loading-overlay.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class LoadingOverlayComponent {
  loading$ = this.store$.select(getGlobalLoading);
  loadingCount$ = this.store$.select(getLoadingCount);
  constructor(private store$: Store<ILoadingState>) {}
}
