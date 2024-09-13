import { Component, OnDestroy, OnInit } from '@angular/core';
import { IMcBreadcrumb, IProduct } from '@shared/models';
import { startLoading, stopLoading } from '@shared/stores';
import { RouteUtils } from '@shared/utils';
import { Subject, takeUntil, withLatestFrom } from 'rxjs';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestingProductService } from '@shared/requesting-product.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ePageActions } from '@shared/enums';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss',
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  breadcrumbs: IMcBreadcrumb[] = [
    { title: 'Sản phẩm', link: ['/', RouteUtils.ProductsPage.Base] },
    { title: 'Chi tiết', disabled: true, link: [] },
  ];
  readonly ePageActions = ePageActions;

  /** product data */
  data?: IProduct = undefined;
  destroy$ = new Subject();
  private id?: string;
  private versionId?: string;

  constructor(
    private requestingProductService: RequestingProductService,
    private router: Router,
    private route: ActivatedRoute,
    private store$: Store,
  ) {}

  ngOnDestroy(): void {
    this.destroy$.complete();
  }

  ngOnInit(): void {
    this.route.params.pipe(
      takeUntil(this.destroy$),
      withLatestFrom(this.route.queryParams)
    ).subscribe(([params, queries]) => {
      this.id = params['id'];
      this.versionId = queries['version'];
      if (this.id && this.versionId) {
        this.getItem();
      }
    });
  }

  getItem() {
    if (!this.id || !this.versionId) {
      return;
    }

    this.store$.dispatch(startLoading());
    this.requestingProductService
      .getDetail({ productID: this.id, productVersionID: this.versionId })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          this.store$.dispatch(stopLoading());
          this.data = res?.result?.data;
        },
        error: () => {
          console.log('get item failed');
          this.store$.dispatch(stopLoading());
          this.router.navigate(['/', RouteUtils.ProductsPage.Base], { replaceUrl: true }).then();
        },
      });
  }
}
